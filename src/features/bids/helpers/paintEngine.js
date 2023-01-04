/* eslint-disable no-undef */
/* eslint-disable prefer-const */
/* eslint-disable no-use-before-define */
/* eslint-disable no-restricted-syntax */

const findMatchingObject = (arrayOfObjects, objectToSearch) => {
  return arrayOfObjects.find((item) => {
    return Object.keys(objectToSearch).every((key) => {
      return item[key] === objectToSearch[key];
    });
  });
};

const totalPaintableArea = (roomObj) => {
  let rawArea = roomObj.walls
    ? roomObj.walls.reduce((acc, wall) => {
        let areaOfCurrentWall = Number(wall.length) * Number(wall.height);
        return acc + Number.isNaN(areaOfCurrentWall) ? 0 : areaOfCurrentWall;
      }, 0)
    : 0;
  let totalNonPaintableAreaDueToOtherSections = 0;
  // Need to implement this in the future;
  let totalCustomNonPaintableArea = roomObj.nonPaintableAreas
    ? roomObj.nonPaintableAreas.reduce((acc, npArea) => {
        let currentNpArea = Number(npArea.area);
        return acc + Number.isNaN(currentNpArea) ? 0 : currentNpArea;
      }, 0)
    : 0;
  return rawArea - totalNonPaintableAreaDueToOtherSections - totalCustomNonPaintableArea;
};

const totalPaintCost = (roomObj) => {
  return roomObj.walls
    ? roomObj.walls.reduce((acc, wall) => {
        let areaOfCurrentWall = Number(wall.length) * Number(wall.height);
        let paintsOnThisWall = wall.paints;
        let totalUnitsOfPaintRequired = 0;
        let wallCoats = wall.coats || 1;
        for (let i = 0; i < wallCoats; i++) {
          let areaCoveragePerUnit =
            i === 0
              ? paintsOnThisWall.areaCoveredPerUnitForFirstCoat
              : paintsOnThisWall.areaCoveredPerUnitForRemainingCoats;
          areaCoveragePerUnit = Number(areaCoveragePerUnit);
          let unitsOfPaintRequiredForThisCoat =
            areaCoveragePerUnit && !Number.isNaN(areaCoveragePerUnit)
              ? areaOfCurrentWall / areaCoveragePerUnit
              : 0;
          totalUnitsOfPaintRequired += unitsOfPaintRequiredForThisCoat;
        }
        let paintUnitCost = Number(paintsOnThisWall.unitPrice);
        return acc + Number.isNaN(paintUnitCost) ? 0 : totalUnitsOfPaintRequired * paintUnitCost;
      }, 0)
    : 0;
};

const totalLabourCost = (roomObj, productionRates, baseRates) => {
  return roomObj.walls
    ? roomObj.walls.reduce((acc, wall) => {
        let areaOfCurrentWall = Number(wall.length) * Number(wall.height);
        let laboursOnThisWall = roomObj.labours;
        if (!laboursOnThisWall) return acc;
        let hourlyRateOfThisLabor = laboursOnThisWall.hourlyRate;
        if (!hourlyRateOfThisLabor) {
          let entryInBaseRatesTable = findMatchingObject(baseRates, {
            bidType: 'Interior',
            proficiency: laboursOnThisWall.proficiency
          });
          hourlyRateOfThisLabor = entryInBaseRatesTable
            ? Number(entryInBaseRatesTable.baseRate)
            : 0;
          if (Number.isNaN(hourlyRateOfThisLabor)) hourlyRateOfThisLabor = 0;
        }
        let entryInProdutionRatesTable = findMatchingObject(productionRates, {
          bidType: 'Interior',
          appliesTo: 'Walls',
          appliesToType: wall.wallType,
          proficiency: laboursOnThisWall.proficiency
        });
        let productionRateOfThisLabor = entryInProdutionRatesTable
          ? Number(entryInProdutionRatesTable.productionRate)
          : 0;
        let hoursSpentForThisWall = productionRateOfThisLabor
          ? areaOfCurrentWall / productionRateOfThisLabor
          : 0;
        let labourCost = hoursSpentForThisWall * hourlyRateOfThisLabor;
        return acc + labourCost;
      }, 0)
    : 0;
};

export const calculateEstimate = (estimateObject, productionRates, baseRates) => {
  const result = {
    rooms: [],
    paintCost: 0,
    labourCost: 0,
    totalPaintableArea: 0,
    subtotal: 0
  };
  result.materialCost = estimateObject.materials
    ? estimateObject.materials.reduce(
        (acc, materialObj) => acc + materialObj.unitPrice * materialObj.quantity,
        0
      )
    : 0;
  result.equipmentCost = estimateObject.equipments
    ? estimateObject.equipments.reduce(
        (acc, equipmentObj) => acc + equipmentObj.unitPrice * equipmentObj.quantity,
        0
      )
    : 0;
  if (Array.isArray(estimateObject.rooms)) {
    for (const roomObj of estimateObject.rooms) {
      const paintableAreaOfRoom = totalPaintableArea(roomObj);
      const totalPaintCosts = totalPaintCost(roomObj);
      const labourCost = estimateObject.isLabourDetailedMode
        ? totalLabourCost(roomObj, productionRates, baseRates)
        : 0;
      const resultRoomObj = {
        roomName: roomObj.roomName,
        paintableArea: paintableAreaOfRoom,
        paintCost: totalPaintCosts
      };
      if (labourCost) resultRoomObj.labourCost = labourCost;
      result.paintCost += totalPaintCosts;
      result.labourCost += labourCost;
      result.totalPaintableArea += paintableAreaOfRoom;
    }
  }
  if (!estimateObject.isLabourDetailedMode) {
    let hourlyRatesOfAallLabours = estimateObject.labours.map((labour) => {
      let rate = labour.hourlyRate;
      if (!rate) {
        const entryInBaseRatesTable = findMatchingObject(baseRates, {
          bidType: 'Interior',
          proficiency: laboursOnThisWall.proficiency
        });
        rate = entryInBaseRatesTable ? Number(entryInBaseRatesTable.baseRate) : 0;
        if (Number.isNaN(rate)) rate = 0;
      }
      return rate;
    });
    let productionRatesForAllLabours = estimateObject.labours.map((labour) => {
      let entryInProdutionRatesTable = findMatchingObject(productionRates, {
        bidType: 'Interior',
        appliesTo: 'Walls',
        appliesToType: wall.wallType,
        proficiency: labour.proficiency
      });
      let productionRateOfThisLabor = entryInProdutionRatesTable
        ? Number(entryInProdutionRatesTable.productionRate)
        : 0;
      return productionRateOfThisLabor;
    });
    let averageHourlyRate = hourlyRatesOfAallLabours.length
      ? hourlyRatesOfAallLabours.reduce((a, b) => a + b, 0) / hourlyRatesOfAallLabours.length
      : 0;
    let averageProductionRate = productionRatesForAllLabours.length
      ? productionRatesForAllLabours.reduce((a, b) => a + b, 0) /
        productionRatesForAllLabours.length
      : 0;
    let hoursNeededToCoverAllArea = result.totalPaintableArea / averageProductionRate;
    result.labourCost += averageHourlyRate * hoursNeededToCoverAllArea;
  }
  result.subtotal =
    result.paintCost + result.materialCost + result.equipmentCost + result.labourCost;
  return result;
};

export const estimateO = {
  _id: '63ac3c912171c9bc4acfc31c',
  materials: [
    {
      id: 'a456263e-8e66-14db-a5d8-fe71cbde3a1d',
      description: 'New',
      materialId: '63ac1db8e199b269f8f9c81c',
      unitPrice: 100,
      quantity: 1
    },
    {
      id: '744c7dc0-da10-2020-f372-3ae93b6ccf98',
      description: 'Rajata4a4a4a`1',
      materialId: '63ac1ed4e199b269f8f9c84b',
      unitPrice: 31,
      quantity: 1
    },
    {
      id: 'd08d667f-2470-8937-6b24-19c33850bf5f',
      description: 'M1',
      materialId: '63ac1f34e199b269f8f9c88f',
      unitPrice: 1,
      quantity: 1
    }
  ],
  equipments: [
    {
      id: '14d02976-5fae-12d9-2d30-8f7365f2042a',
      description: 'New',
      equipmentId: '63ad3f37c9c8af72e07fcdbf',
      unitPrice: 100,
      quantity: 1
    },
    {
      id: 'b1e0709c-27a3-05ca-7d5d-674727893685',
      description: 'Latest Equipment',
      equipmentId: '63ad43a3c9c8af72e07fcf98',
      unitPrice: 305,
      quantity: 1
    }
  ],
  labours: [
    {
      labourId: '63ac3e3d2171c9bc4acfc3d3',
      email: 'rajatgaukjcftam832@gmail.com',
      name: 'Lori Nelson',
      proficiency: 'Intermediate'
    }
  ],
  organization: {
    _id: '63ac10b6e199b269f8f9c673',
    name: 'Romy Köster',
    email: 'rajatgautasfsddm832@gmail.com',
    address: 'Schnwalder Allee 152',
    phone: '0748827111',
    processes: '63ac10b6e199b269f8f9c657',
    materials: '63ac10b6e199b269f8f9c660',
    productionRates: '63ac10b6e199b269f8f9c66d',
    equipments: '63ac10b6e199b269f8f9c66f',
    proficiencies: '63ac10b6e199b269f8f9c671',
    active: true,
    createdAt: '2022-12-28T09:47:34.686Z',
    updatedAt: '2022-12-28T09:47:34.686Z',
    __v: 0
  },
  rooms: [
    {
      roomName: 'Entrance Hall',
      walls: [
        {
          paints: {
            description: 'Nice Description',
            unitPrice: 100,
            paintId: '63a022b3d091143dbde4f848',
            areaCoveredPerUnitForFirstCoat: '3',
            arearCoveredPerUnitForRemainingCoats: '4'
          },
          labours: {
            name: 'Lori Nelson',
            proficiency: 'Intermediate',
            labourId: '63ac3e3d2171c9bc4acfc3d3'
          },
          name: 'North',
          height: 3,
          length: 3,
          coats: 3,
          prepHour: 3,
          wallType: 'Smooth',
          _id: '63ac3ccd2171c9bc4acfc338'
        }
      ],
      ceilings: [],
      windows: [],
      doors: [],
      baseboardTrims: [],
      windowTrims: [],
      doorJambs: [],
      crownMoldings: [],
      closets: [],
      nonPaintableAreas: [
        {
          description: 'Current Total',
          area: 0,
          _id: '63ac3ccd2171c9bc4acfc339'
        }
      ],
      _id: '63ac3ccd2171c9bc4acfc337'
    }
  ],
  __v: 0,
  endDate: '2022-12-19T18:15:00.000Z',
  isMaterialProvidedByCustomer: false,
  startDate: '2022-11-30T18:15:00.000Z',
  subType: 'Room by Room',
  type: 'Interior',
  isLabourDetailedMode: true
};

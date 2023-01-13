/* eslint-disable no-undef */
/* eslint-disable prefer-const */
/* eslint-disable no-use-before-define */
/* eslint-disable no-restricted-syntax */

const nonPaintableSectionsOfRoom = ['baseboardTrims', 'windowTrims'];

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
        let areaOfCurrentWall =
          Number(wall.length) * Number(wall.height) - Number(wall?.nonPaintableArea ?? 0);
        return acc + Number.isNaN(areaOfCurrentWall) ? 0 : areaOfCurrentWall;
      }, 0)
    : 0;

  let totalNonPaintableAreaDueToOtherSections = 0;
  // Need to implement this in the future;

  nonPaintableSectionsOfRoom.forEach((nonPaintableSection) => {
    let nonPaintableAreasOfIndividualSection = roomObj?.[nonPaintableSection]
      ? roomObj?.[nonPaintableSection]?.reduce((acc, trim) => {
          let areaOfTrim = Number(trim?.length) * Number(trim?.height);
          return acc + Number.isNaN(areaOfTrim) ? 0 : areaOfTrim;
        }, 0)
      : 0;
    totalNonPaintableAreaDueToOtherSections += nonPaintableAreasOfIndividualSection;
  });

  return rawArea - totalNonPaintableAreaDueToOtherSections;
};

const totalPaintCost = (roomObj) => {
  return roomObj.walls
    ? roomObj.walls.reduce((acc, wall) => {
        let areaOfCurrentWall =
          Number(wall.length) * Number(wall.height) - Number(wall?.nonPaintableArea ?? 0);
        let paintsOnThisWall = wall.paints;
        let totalUnitsOfPaintRequired = 0;
        let wallCoats = wall.coats || 1;
        for (let i = 0; i < wallCoats; i++) {
          let areaCoveragePerUnit =
            i === 0
              ? paintsOnThisWall?.areaCoveredPerUnitForFirstCoat
              : paintsOnThisWall?.areaCoveredPerUnitForRemainingCoats;
          areaCoveragePerUnit = Number(areaCoveragePerUnit);
          let unitsOfPaintRequiredForThisCoat =
            areaCoveragePerUnit && !Number.isNaN(areaCoveragePerUnit)
              ? areaOfCurrentWall / areaCoveragePerUnit
              : 0;
          totalUnitsOfPaintRequired += unitsOfPaintRequiredForThisCoat;
        }
        let paintUnitCost = Number(paintsOnThisWall?.unitPrice);
        return acc + Number.isNaN(paintUnitCost) ? 0 : totalUnitsOfPaintRequired * paintUnitCost;
      }, 0)
    : 0;
};

const totalLabourCost = (roomObj, productionRates, baseRates) => {
  return roomObj.walls
    ? roomObj.walls.reduce((acc, wall) => {
        let areaOfCurrentWall =
          Number(wall.length) * Number(wall.height) - Number(wall?.nonPaintableArea ?? 0);
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
  result.materialCost = estimateObject?.materials
    ? estimateObject?.materials.reduce(
        (acc, materialObj) => acc + materialObj.unitPrice * materialObj.quantity,
        0
      )
    : 0;
  result.equipmentCost = estimateObject?.equipments
    ? estimateObject.equipments.reduce(
        (acc, equipmentObj) => acc + equipmentObj.unitPrice * equipmentObj.quantity,
        0
      )
    : 0;
  if (Array.isArray(estimateObject?.rooms)) {
    for (const roomObj of estimateObject.rooms) {
      const paintableAreaOfRoom = totalPaintableArea(roomObj);
      const totalPaintCosts = totalPaintCost(roomObj);
      const labourCost = estimateObject.isLabourDetailedMode
        ? totalLabourCost(roomObj, productionRates, baseRates)
        : 0;
      const resultRoomObj = {
        roomName: roomObj.roomName,
        totalPaintableArea: paintableAreaOfRoom,
        paintCost: totalPaintCosts
      };
      if (labourCost) resultRoomObj.labourCost += labourCost;
      if (resultRoomObj) result.rooms = [...result.rooms, resultRoomObj];
      result.paintCost += totalPaintCosts;
      result.labourCost += labourCost;
      result.totalPaintableArea += paintableAreaOfRoom;
    }
  }
  let laboursOnThisWall;
  let wall;
  if (!estimateObject?.isLabourDetailedMode) {
    let hourlyRatesOfAallLabours = estimateObject?.labours.map((labour) => {
      let rate = labour?.hourlyRate;
      if (!rate) {
        const entryInBaseRatesTable = findMatchingObject(baseRates, {
          bidType: 'Interior',
          proficiency: laboursOnThisWall?.proficiency
        });
        rate = entryInBaseRatesTable ? Number(entryInBaseRatesTable?.baseRate) : 0;
        if (Number.isNaN(rate)) rate = 0;
      }
      return rate;
    });
    let productionRatesForAllLabours = estimateObject?.labours.map((labour) => {
      let entryInProdutionRatesTable = findMatchingObject(productionRates, {
        bidType: 'Interior',
        appliesTo: 'Walls',
        appliesToType: wall?.wallType,
        proficiency: labour?.proficiency
      });
      let productionRateOfThisLabor = entryInProdutionRatesTable
        ? Number(entryInProdutionRatesTable.productionRate)
        : 0;
      return productionRateOfThisLabor;
    });
    let averageHourlyRate = hourlyRatesOfAallLabours?.length
      ? hourlyRatesOfAallLabours.reduce((a, b) => a + b, 0) / hourlyRatesOfAallLabours.length
      : 0;
    let averageProductionRate = productionRatesForAllLabours?.length
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

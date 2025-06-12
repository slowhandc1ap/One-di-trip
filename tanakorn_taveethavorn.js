"use strict";
function minEnergy(start, shops, stations, target) {
    // คำนวณพลังงานขั้นต่ำจากจุดหนึ่งไปอีกจุดหนึ่ง
    function getMinEnergy(from, to) {
        // เดินตรงไปจุดหมาย
        const directCost = Math.abs(from - to);
        // ถ้าไม่มีสถานีหรือสถานีน้อยกว่า 2 ไม่ต้องใช้สถานี
        if (stations.length < 2)
            return directCost;
        // ลองทุกคู่สถานีเพื่อหาการเดินทางผ่านสถานีที่ถูกที่สุด
        let minStationCost = directCost;
        for (const startStation of stations) {
            for (const endStation of stations) {
                const cost = Math.abs(from - startStation) + Math.abs(endStation - to);
                minStationCost = Math.min(minStationCost, cost);
            }
        }
        return minStationCost;
    }
    // สร้างทุกการเรียงลำดับของร้านค้า
    function permute(arr) {
        if (arr.length <= 1)
            return [arr];
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            const current = arr[i];
            const remaining = [...arr.slice(0, i), ...arr.slice(i + 1)];
            const subPerms = permute(remaining);
            result.push(...subPerms.map(perm => [current, ...perm]));
        }
        return result;
    }
    // หาพลังงานขั้นต่ำสุดของทุกเส้นทาง
    let minTotalEnergy = Infinity;
    const allRoutes = permute(shops);
    for (const route of allRoutes) {
        let energy = 0;
        let currentPos = start;
        // คำนวณพลังงานสำหรับแต่ละร้านในเส้นทาง
        for (const shop of route) {
            energy += getMinEnergy(currentPos, shop);
            currentPos = shop;
        }
        energy += getMinEnergy(currentPos, target);
        minTotalEnergy = Math.min(minTotalEnergy, energy);
    }
    return minTotalEnergy;
}
const start = 2;
const shops = [4, 9];
const stations = [3, 6, 8];
const target = 7;
const result = minEnergy(start, shops, stations, target);
console.log("Minimum energy required:", result);

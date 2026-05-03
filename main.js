const maleFirstNames = [
  "Jan", "Petr", "Tomáš", "Jiří", "Martin", "David", "Pavel", "Josef", "Miroslav", "Václav",
  "Lukáš", "Michal", "Jakub", "Ondřej", "Karel", "Vojtěch", "Adam", "Matěj", "Filip", "Vít",
  "Radek", "Roman", "Daniel", "Antonín", "Zdeněk", "Marek", "Jaroslav", "Libor", "Aleš", "Stanislav",
  "Vratislav",
];

const femaleFirstNames = [
  "Marie", "Jana", "Anna", "Kateřina", "Lenka", "Petra", "Eva", "Alena", "Veronika", "Lucie",
  "Martina", "Hana", "Eliška", "Barbora", "Tereza", "Natálie", "Kristýna", "Klára", "Adéla", "Nikola",
  "Denisa", "Monika", "Andrea", "Zuzana", "Markéta", "Věra", "Jitka", "Daniela", "Ivana", "Olga",
  "Jiřina",
];

const surnames = [
  "Novák", "Svoboda", "Novotný", "Dvořák", "Černý", "Procházka", "Kučera", "Veselý", "Horák", "Němec",
  "Pospíšil", "Marek", "Král", "Urban", "Bartoš", "Vlček", "Polák", "Kopecký", "Kovář", "Holub",
  "Růžička", "Beneš", "Fiala", "Sedlák", "Zeman", "Jelínek", "Matoušek", "Doležal", "Krejčí", "Šimek",
  "Sýkora", "Ptáček",
];

const workloads = [10, 20, 30, 40];

export function main(dtoIn) {
  const employees = generateEmployeeData(dtoIn);
  const dtoOut = getEmployeeStatistics(employees);
  return dtoOut;
}

export function generateEmployeeData(dtoIn) {
  validateDtoIn(dtoIn);

  const {
    count,
    age: { min: minAge, max: maxAge },
  } = dtoIn;

  const currentYear = new Date().getUTCFullYear();
  const minBirthYear = currentYear - maxAge;
  const maxBirthYear = currentYear - minAge;

  const dtoOut = [];

  for (let i = 0; i < count; i++) {
    const isMale = Math.random() < 0.5;
    const gender = isMale ? "male" : "female";

    const firstNames = isMale ? maleFirstNames : femaleFirstNames;
    const name = getRandomItem(firstNames);

    const baseSurname = getRandomItem(surnames);
    const surname = isMale ? baseSurname : feminizeSurname(baseSurname);

    const birthYear = randomIntInclusive(minBirthYear, maxBirthYear);
    const month = String(randomIntInclusive(1, 12)).padStart(2, "0");
    const day = String(randomIntInclusive(1, 28)).padStart(2, "0");
    const birthdate = `${birthYear}-${month}-${day}T00:00:00.000Z`;

    const workload = getRandomItem(workloads);

    dtoOut.push({
      gender,
      birthdate,
      name,
      surname,
      workload,
    });
  }

  return dtoOut;
}

export function getEmployeeStatistics(employees) {
  if (!Array.isArray(employees)) {
    throw new Error("employees must be an array");
  }

  const total = employees.length;

  let workload10 = 0;
  let workload20 = 0;
  let workload30 = 0;
  let workload40 = 0;

  const ages = [];
  const workloadValues = [];

  let sumAge = 0;
  let minAge = null;
  let maxAge = null;

  let womenWorkloadSum = 0;
  let womenCount = 0;

  for (const e of employees) {
    if (!e || typeof e !== "object") continue;

    if (e.workload === 10) workload10++;
    else if (e.workload === 20) workload20++;
    else if (e.workload === 30) workload30++;
    else if (e.workload === 40) workload40++;

    const age = calculateAge(e.birthdate);
    ages.push(age);
    sumAge += age;

    minAge = minAge === null ? age : Math.min(minAge, age);
    maxAge = maxAge === null ? age : Math.max(maxAge, age);

    workloadValues.push(e.workload);

    if (e.gender === "female") {
      womenCount++;
      womenWorkloadSum += e.workload;
    }
  }

  const averageAge = total === 0 ? 0 : roundTo1Decimal(sumAge / total);
  const medianAge = median(ages);
  const medianWorkload = median(workloadValues);
  const averageWomenWorkload = womenCount === 0 ? 0 : Math.round(womenWorkloadSum / womenCount);

  const sortedByWorkload = employees
    .slice()
    .sort((a, b) => {
      const wa = a && typeof a.workload === "number" ? a.workload : 0;
      const wb = b && typeof b.workload === "number" ? b.workload : 0;
      return wa - wb;
    })
    .map((e) => ({
      gender: e.gender,
      birthdate: e.birthdate,
      name: e.name,
      surname: e.surname,
      workload: e.workload,
    }));

  return {
    total,
    workload10,
    workload20,
    workload30,
    workload40,
    averageAge,
    minAge: minAge === null ? 0 : minAge,
    maxAge: maxAge === null ? 0 : maxAge,
    medianAge,
    medianWorkload,
    averageWomenWorkload,
    sortedByWorkload,
  };
}

function validateDtoIn(dtoIn) {
  if (!dtoIn || typeof dtoIn !== "object") throw new Error("dtoIn must be an object");
  if (!Number.isInteger(dtoIn.count) || dtoIn.count < 0) throw new Error("dtoIn.count must be a non-negative integer");
  if (!dtoIn.age || typeof dtoIn.age !== "object") throw new Error("dtoIn.age must be an object");
  if (!Number.isInteger(dtoIn.age.min) || !Number.isInteger(dtoIn.age.max)) {
    throw new Error("dtoIn.age.min and dtoIn.age.max must be integers");
  }
  if (dtoIn.age.min > dtoIn.age.max) throw new Error("dtoIn.age.min must be <= dtoIn.age.max");
}

function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function feminizeSurname(baseSurname) {
  if (baseSurname.endsWith("ý")) {
    return baseSurname.slice(0, -1) + "á";
  }
  if (baseSurname.endsWith("ek")) {
    return baseSurname.slice(0, -2) + "ková";
  }
  return baseSurname + "ová";
}

function randomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function calculateAge(birthdateIsoString) {
  const birth = new Date(birthdateIsoString);
  if (Number.isNaN(birth.getTime())) {
    throw new Error(`Invalid birthdate: ${birthdateIsoString}`);
  }

  const now = new Date();
  let age = now.getUTCFullYear() - birth.getUTCFullYear();

  const mNow = now.getUTCMonth();
  const mBirth = birth.getUTCMonth();

  if (mNow < mBirth || (mNow === mBirth && now.getUTCDate() < birth.getUTCDate())) {
    age--;
  }

  return age;
}

function median(values) {
  if (!Array.isArray(values) || values.length === 0) return 0;

  const nums = values
    .filter((v) => typeof v === "number" && !Number.isNaN(v))
    .slice()
    .sort((a, b) => a - b);

  if (nums.length === 0) return 0;

  const mid = Math.floor(nums.length / 2);
  if (nums.length % 2 === 1) {
    return nums[mid];
  }
  return (nums[mid - 1] + nums[mid]) / 2;
}

function roundTo1Decimal(num) {
  return Math.round(num * 10) / 10;
}

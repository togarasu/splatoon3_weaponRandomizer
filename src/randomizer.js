export function getRandomInt(max) {
  return Math.floor(Math.random() * (max + 1));
}

function randomWeaponSelect(weaponList){
  return Object.keys(weaponList)[getRandomInt(Object.keys(weaponList).length)]
}

export function allRandomWeaponSelect(users, weaponList){
  //usersの更新関数でいいかな？
  users.map((user) => user["weapon"] = randomWeaponSelect(weaponList))
  return users
}

function combination(list, selectNumber){
  // なーんもわからん。ハードコートするわ
  let alphaPatternList = [[0,1,2,3],
                          [0,1,2,4],
                          [0,1,2,5],
                          [0,1,2,6],
                          [0,1,2,7],
                          [0,1,3,4],
                          [0,1,3,5],
                          [0,1,3,6],
                          [0,1,3,7],
                          [0,1,4,5],
                          [0,1,4,6],
                          [0,1,4,7],
                          [0,1,5,6],
                          [0,1,5,7],
                          [0,1,6,7],
                          [0,2,3,4],
                          [0,2,3,5],
                          [0,2,3,6],
                          [0,2,3,7],
                          [0,2,4,5],
                          [0,2,4,6],
                          [0,2,4,7],
                          [0,2,5,6],
                          [0,2,5,7],
                          [0,2,6,7],
                          [0,3,4,5],
                          [0,3,4,6],
                          [0,3,4,7],
                          [0,3,5,6],
                          [0,3,5,7],
                          [0,3,6,7],
                          [0,4,5,6],
                          [0,4,5,7],
                          [0,4,6,7],
                          [0,5,6,7],
                          [1,2,3,4],
                          [1,2,3,5],
                          [1,2,3,6],
                          [1,2,3,7],
                          [1,2,4,5],
                          [1,2,4,6],
                          [1,2,4,7],
                          [1,2,5,6],
                          [1,2,5,7],
                          [1,2,6,7],
                          [1,3,4,5],
                          [1,3,4,6],
                          [1,3,4,7],
                          [1,3,5,6],
                          [1,3,5,7],
                          [1,3,6,7],
                          [1,4,5,6],
                          [1,4,5,7],
                          [1,4,6,7],
                          [1,5,6,7],
                          [2,3,4,5],
                          [2,3,4,6],
                          [2,3,4,7],
                          [2,3,5,6],
                          [2,3,5,7],
                          [2,3,6,7],
                          [2,4,5,6],
                          [2,4,5,7],
                          [2,4,6,7],
                          [2,5,6,7],
                          [3,4,5,6],
                          [3,4,5,7],
                          [3,4,6,7],
                          [3,5,6,7],
                          [4,5,6,7]]
  let patternLists = alphaPatternList
    .map(l => [l, [0,1,2,3,4,5,6,7].filter(val=> !l.includes(val))])
    .map(([alphas, betas]) => [alphas.map(i => list[i]), betas.map(i => list[i])])
  return patternLists
};

export function randomWeaponChoiceWithRange(users, weaponList){
  function minRangeDifference(a, b){
    function sumRange(l) {
      return l.map(e => weaponList[e]["matchingRange"]).reduce((x, y) => x + y)
    }
    let aDiff = a.map(e => sumRange(e)).reduce((x, y) => Math.abs(x - y))
    let bDiff = b.map(e => sumRange(e)).reduce((x, y) => Math.abs(x - y))
    if (aDiff > bDiff){
      return 1
    } else if (aDiff < bDiff){
      return -1
    } else {
      return 0
    }
  }

  let alphaMembers = users.filter((user) => user["team"] === "alpha")
  let betaMembers = users.filter((user) => user["team"] === "beta")
  if (alphaMembers.length !== 4 || betaMembers.length !== 4){
    alert("メンバーが4 vs 4になっていない")
    return users
  }
  // 8つのブキをチョイスする
  let choiceWeapons = [1,2,3,4,5,6,7,8].map((_) => randomWeaponSelect(weaponList))
  // 全ての配り方のリストを作る
  let combinations = combination(choiceWeapons, 4)
  // 最もalpha-betaの射程差が少ない配り方を選ぶ
  let sortedList = combinations.sort(minRangeDifference)
  let minRangeDifferentList = sortedList[0]
  console.log(minRangeDifferentList)
  // usersに適用して返す
  let alphaUsers = users.filter(x => x["team"] === "alpha")
  let betaUsers = users.filter(x => x["team"] === "beta")
  for (let i=0; i < alphaUsers.length; i++){
    alphaUsers[i]["weapon"] = minRangeDifferentList[0][i]
    betaUsers[i]["weapon"] = minRangeDifferentList[1][i]
  }
  return users
}

import {useState} from 'react'
import User from './User.js'
import {randomWeaponChoiceWithRange, allRandomWeaponSelect} from './randomizer.js'
import weapons from "./weapons.json"

export default function App(){
  const [users, setUsers] = useState([
    {"number": 0, "team": "alpha", "name": "", "weapon": "wakaba"},
    {"number": 1, "team": "alpha", "name": "", "weapon": "wakaba"},
    {"number": 2, "team": "alpha", "name": "", "weapon": "wakaba"},
    {"number": 3, "team": "alpha", "name": "", "weapon": "wakaba"},
    {"number": 4, "team": "beta", "name": "", "weapon": "wakaba"},
    {"number": 5, "team": "beta", "name": "", "weapon": "wakaba"},
    {"number": 6, "team": "beta", "name": "", "weapon": "wakaba"},
    {"number": 7, "team": "beta", "name": "", "weapon": "wakaba"}
  ])
  const [weaponList, setWeaponList] = useState(weapons)
  function handleUser(number, name, weapon, team){
    // User側で判断したほうがよくないか?
    users[number] = {"number": number, "name": name, "weapon": weapon, "team": team}
    setUsers([...users])
  }
  function genUser(userData){
    return(
      <User number = {userData["number"]} team = {userData["team"]} name={userData["name"]} weapon={userData["weapon"]} weaponList={weaponList} handleUser = {handleUser}/>
    )
  }
  // function add() {
  //   setUsers([...users, {"number": users.length, "team": "alpha"}])
  // }
  // function del() {
  //   if (users.length > 0) {
  //     users.pop()
  //     setUsers([...users])
  //   } else {
  //     console.log("にゃん: だれもいないのにdel押してる")
  //   }
  // }
  return(
    <div>
      <div>
        {users.map(genUser)}
      </div>
      <div className="control">
        <div className="random">
          <button onClick={() => setUsers([...allRandomWeaponSelect(users, weaponList)])}> 完全ランダム</button>
          <button onClick={() => setUsers([...randomWeaponChoiceWithRange(users, weaponList)])}>射程分けランダム</button>
        </div>
      </div>
    </div>
  )
}

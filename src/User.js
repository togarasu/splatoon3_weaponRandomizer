// TODO: weaponの生成器が欲しい
// TODO: コンポーネントからデータを取り出すことは多分できないのかな

export default function User({number, name, weapon, team, weaponList, handleUser}){
  let teamColor = (team === "alpha") ? "#cc5555" : (team === "beta") ? "#5555cc" : "#cccccc"
  function nextTeam(team){
    if (team === "alpha"){
      return "beta"
    } else if (team === "beta") {
      return "none"
    } else {
      return "alpha"
    }
  }
  // console.log(number, name, weapon, team)
  return (
    <div style={{"backgroundColor": "#9999cc", "margin": 5, "padding": 10}}>
      <div>
        <button style={{"backgroundColor": teamColor}} onClick={(x) => handleUser(number, name, weapon, nextTeam(team))}>{team}</button>
        <input type="text" placeholder="ユーザー名" onChange={(x) => handleUser(number, x.target.value, weapon, team)}/>
      </div>
      <div>
        <select value={weapon} onChange={(x) => handleUser(number, name, x.target.value, team)}>
          {Object.keys(weaponList).map((x) => <option value={x}>{weaponList[x]["display_name"]}</option>)}
        </select>
      </div>
    </div>
  )
}



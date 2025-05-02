import { useRecoilState } from "recoil"
import { countState } from "../states/countAtom"

// RecoilState >> recoil 전용 useState
function RecoilEx(){
    // let [count, setCount] = useRecoilState(countState);
    let [countMap, setCount] = useRecoilState(countState);
    return (
        <>
            {/* <h3>{count}</h3>
            <button onClick={()=>{setCount(count+1)}}>+++</button> */}
            <h3>countA : {countMap.countA}</h3>
            <button onClick={()=>{setCount(prev => ({...prev, countA:countMap.countA+1}))}}>A+++</button>
            <h3>countB : {countMap.countB}</h3>
            <button onClick={()=>{setCount(prev => ({...prev, countB:countMap.countB+1}))}}>B+++</button>
        </>
    )
}

export default RecoilEx
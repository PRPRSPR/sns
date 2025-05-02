import { atom } from "recoil";

export const countState = atom({
    key : "countState",
    // default : 1 
    default: {
        countA : 1,
        countB : 10,
        countC : 100
    }
});
// atom(); 모든 컴포넌트에서 꺼내 쓸 수 있음
// key:default(value) 형태로.
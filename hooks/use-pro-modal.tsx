import  {create} from "zustand"

interface usePromodealStore {
    isOpen : boolean;
    onOpen : () => void ;
    onClose :() => void;
}

export const useProModal =create<usePromodealStore> ((set)=>({
    isOpen :false,
    onOpen: ()=>set({isOpen: true}),
    onClose :()=> set ({isOpen:false})
}))
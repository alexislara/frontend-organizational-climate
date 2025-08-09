import {atom} from "jotai";
import {PropsWithChildren} from "react";

export const open_filters = atom<boolean>(false)
export const children_filters = atom<PropsWithChildren>({children:undefined})
import {atom} from "jotai";
import {GenericHookProps} from "@/types/interfaces";
import {PrimitiveAtom} from "jotai/index";

class AtomFilters {
    filters: PrimitiveAtom<GenericHookProps["filters"]>;

    constructor(filters: GenericHookProps["filters"]) {
        this.filters = atom(filters);
    }

}

export default AtomFilters;
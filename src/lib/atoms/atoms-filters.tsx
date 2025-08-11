import {atom} from "jotai";
import {PrimitiveAtom} from "jotai/index";


export interface AtomFiltersProps<T> {
    filters: T
}

class AtomFilters<T> {
    filters: PrimitiveAtom<AtomFiltersProps<T>["filters"]>;
    default_filters: AtomFiltersProps<T>["filters"]

    constructor(filters: AtomFiltersProps<T>["filters"]) {
        this.filters = atom(filters);
        this.default_filters = filters;
    }

}

export default AtomFilters;
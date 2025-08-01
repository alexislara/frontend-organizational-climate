import {PaginationState} from "@tanstack/table-core";
import {atom, PrimitiveAtom} from "jotai";

interface AtomsDataTableProps {
    pagination: PaginationState
}

class AtomsDataTable {
    pagination: PrimitiveAtom<PaginationState>;

    constructor({
        pagination
    }:AtomsDataTableProps) {
        this.pagination = atom(pagination);
    }

}

export default AtomsDataTable;
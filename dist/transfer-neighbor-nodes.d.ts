import { Node } from "agora-graph";
export interface TNNMap {
    [key: number]: boolean;
}
/**
 * Transfer neighbor nodes (definition3)
 * @param V
 * @param q
 * @param d
 */
export declare function TNN(V: Node[], q: Node, d: number): Node[];

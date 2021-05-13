/// <reference types="react" />
import './style';
interface Props {
    data: Array<Data>;
}
interface Data {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: Array<string>;
}
declare function RenderTable(props: Props): JSX.Element;
export default RenderTable;

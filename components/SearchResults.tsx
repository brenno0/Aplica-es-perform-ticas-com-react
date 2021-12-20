
import { ProductItem } from "./ProductItem";
import { List, ListRowRenderer } from 'react-virtualized'

interface SearchResultsProps {
    totalPrice:number;
    results:Array<{
        id:number;
        price:number;
        title:string;
    }>
    onAddToWishList:(id:number) => void
}
export const SearchResults = ({ totalPrice ,results,onAddToWishList }: SearchResultsProps) => {


    const addProductToWishList = () => {
        const productId = results.map(result => {
            return result.id
        })
        console.log(productId)
    }
    const rowRenderer: ListRowRenderer = ({ index,key, style }) => {
        return (
            <div key={key} style={style}>
                <ProductItem 
                product={results[index]}
                onAddToWishList={onAddToWishList}
                />
            </div>
           
        )
    }
    return  (
        <div>
            <h2>{totalPrice}</h2>
           <List
           height={300}
           rowHeight={300}
           width={900}
           overscanRowCount={5}
           rowCount={results.length}
           rowRendered={rowRenderer}
            />
        </div>
    )
}
/**
 * useMemo / useCallback
 * 1. Usar em casos em que há Calculos pesados.
 * 2. Caso a funcionalidade/variável que o utiliza o useMemo seja passada para o componente filho, o useMemo também evita que essa variável ocupe um novo espaço na memória.
 * 3. No caso do useCallback a este hook apenas memoriza uma função. O hook é utilizado em situações onde a função será repassada como prop para um componente filho
 * A diferença entre ambos os hooks está no fato de "useMemo" memorizar um resultado e useCallback uma function.
 */
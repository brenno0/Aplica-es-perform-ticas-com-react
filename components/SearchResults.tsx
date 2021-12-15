
import { useMemo } from 'react';
import { ProductItem } from "./ProductItem";

interface SearchResultsProps {
    results:Array<{
        id:number;
        price:number;
        title:string;
    }>
}
export const SearchResults = ({ results }: SearchResultsProps) => {
    const totalPrice = useMemo(() => {
       return results.reduce((total, product) => {
            return total +  product.price
        }, 0) 
    },[results])

    return  (
        <div>
            <h2>{totalPrice}</h2>
            {results.map(product => {
                return (
                    <ProductItem key={product.id} product={product} />
                );
            })}
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
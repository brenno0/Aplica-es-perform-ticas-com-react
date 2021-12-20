import { memo, useState } from 'react'
import dynamic from 'next/dynamic';
import { AddProductToWishListProps } from './AddProductToWishList';
// import { AddProductToWishList } from './AddProductToWishList';
const AddProductToWishList = dynamic<AddProductToWishListProps>(() => {
    return import('./AddProductToWishList').then(mod => mod.AddProductToWishList)
}, {    
    loading: () => <span>Carregando...</span>
})


interface ProductItemProps { 
    product: {
        id:number;
        price:number;
        title:string;
        priceFormatted:string;
    }
    onAddToWishList: (id:number) => void;
}


 const ProductItemComponent = ({ product, onAddToWishList }: ProductItemProps) => {
     const [isAddingToWishList,setIsAddingToWishList] = useState(false)
    return (
        <div>
            {product.title} - <strong> {product.priceFormatted} </strong>
            <button onClick={() => setIsAddingToWishList(true)}>Adicionar aos favoritos</button>
            {isAddingToWishList === true && (
                <AddProductToWishList 
                onAddToWishList={() => onAddToWishList(product.id)}
                onRequestClose={() => setIsAddingToWishList(false)}
                />
            )}
           
        </div>
    )
    
}
export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
    return Object.is(prevProps.product,nextProps.product)
});
/**
 * Quando usar o memo
 * 1.Quando o componente é um pure functional component, ou seja, se o componente receber sempre a mesma prop, ele vai devolver sempre o mesmo html
 * 2.Quando a prop é sempre a mesma, quando não tem uma api que muda a prop de tempos em tempos ou algo que dependa do horário
 * 3.Quando o componente é re-renderizado muitas e muitas vezes
 * 4.Quando o componente tem de médio a grande sizing
 */
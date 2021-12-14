import { memo } from 'react'

interface ProductItemProps { 
    product: {
        id:number;
        price:number;
        title:string;
    }
}


 const ProductItemComponent = ({ product }: ProductItemProps) => {
    return (
        <div>
            {product.title} - <strong> {product.price} </strong>
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
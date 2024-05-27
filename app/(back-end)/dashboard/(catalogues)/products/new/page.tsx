
import FromHeader from './../../../../../../components/backend/FromHeader';
import FormContainer from './../../../../../../components/backend/FormContainer';
import ProductForm from './../../../../../../components/backend/ProductForm';
const NewProduct = async() => {
  
  return (
    <div className="">
      <FromHeader title="Add New Product" href={'/dashboard/products'} />
      <FormContainer>
      <ProductForm/>
      </FormContainer>
    </div>
  );
};

export default NewProduct;

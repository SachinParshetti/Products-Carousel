import axios from "axios";
import { useState, useEffect, useRef } from "react";
function Carousel()
{
   let productId = useRef(1)
   let [product,setProduct] = useState({id:0,title:'',price:0,description:'',rating:{rate:0,count:0},image:null})
   let [rengeValue,setRengevalue] = useState(1);
   let [slidemsg,setSlidemsg] = useState("Manual slid Show")
   let [icon, setIcon] = useState("btn btn-primary bi bi-play-btn")
   let thread = useRef(null);

   function LoadProducts(Id)
   {
    axios.get(`https://fakestoreapi.com/products/${Id}`)
    .then(responce => setProduct(responce.data))
   // console.log(product)
   }
   
   function handleNextbtnClick()
   {
   
    if(productId.current < 20)
    {  productId.current = parseInt(productId.current) + 1
        setRengevalue(productId.current);
        console.log("range value:", productId)
    }
    else{
        productId.current = 1
    }
     LoadProducts(productId.current);
   }

   function handlePrevbtnClick()
   {
     
     if(productId.current > 1)
        {
           productId.current -= 1
        }
        else
        {
            productId.current = 20
        }
     
     LoadProducts(productId.current)
     setRengevalue(productId.current)
   }
   useEffect(()=>{
    LoadProducts(productId.current)
   },[]);

   function handleRangeChange(e)
   {
    productId.current = e.target.value
    LoadProducts(productId.current)  
    setRengevalue(productId.current);
   
    
   }

  function LoadProductsAuto()
   {
    if(productId.current < 20)
    {
    productId.current = productId.current + 1;
    setRengevalue(productId.current)
    LoadProducts(productId.current)
    }
    else
    {
        productId.current = 1
        setRengevalue(productId.current)
       
    }

   }
  
    

   function handlePlayClick()
   {
    setSlidemsg("Auto Slide show (Running)")
    if(thread.current === null)
    {
      thread.current = setInterval(() => {
          LoadProductsAuto()
    }, 2000);
    }
    setIcon("btn btn-primary bi bi-pause-btn")
   }

   function handlePauseClick()
   {
       clearInterval(thread.current)
       thread.current = null
       setSlidemsg("Manual slide show")
       setIcon("btn btn-primary bi bi-play-btn")
   }

    return(
        <>
        <div className="d-flex justify-content-center align-items-center" style={{height:"100vh"}}> 
              <div className="card" style={{width:"500px",}}>
                 <div className="card-header p-3">
                    <h5 className="text-center">
                      {
                        product.title
                      }
                    </h5>
                 </div>
                
                <div className="card-body">
                <div className="d-flex justify-content-center align-items-center">
                <button className="btn bg-dark text-white  bi bi-chevron-left mx-2"onClick={handlePrevbtnClick} ></button>               
                 <div className="w-100 ">
                          <img src={product.image} alt="" style={{height:"300px",width:"100%"}} className="rounded rounded-4 border position-relative "/>
                          <span className="badge position-absolute rounded rounded-circle z-3 top-25 bg-danger p-3 end-0 " >
                        {
                            product.price.toLocaleString("en-US",{style:"currency",currency:"USD"})
                        } 
                       </span>
                 </div>
                       
                     <button className="btn bg-dark text-white bi bi-chevron-right mx-2"  onClick={handleNextbtnClick}></button>
                </div>
                </div>
                <div className="p-2 mx-4">
                    <input type="range" className='form-range' min="1" max="20" value={rengeValue} onChange={handleRangeChange}/>
                </div>
                <div className="my-2 text-center fw-bold">

                      {
                        slidemsg
                      
                      }
                     
                </div>
                <div className="card-footer text-center">
                      <button className={icon} onClick={handlePlayClick}></button>
                      <button className="btn btn-danger bi bi-pause-btn ms-2" onClick={handlePauseClick}> </button>
                </div>
              </div>
        </div>
        </>
    )
}
export default Carousel;
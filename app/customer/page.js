import React from 'react'
import "./customer.css"
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'font-awesome/css/font-awesome.min.css';
import background  from '../../public/page-turner.png'
import diamour from '../../public/assets/icons/01.png';




function Page() {
  return (
   <>


      <section className="container pt-3 mb-3">
        <div className='row justify-content-center'>
    <div className="row pt-5 mt-30">
        <div className=" customer-card col-lg-4 col-sm-6 mb-30 pb-5">
            <a className="card" href="#">
            <div className=" diamour box-shadow rounded-circle  mx-auto " style={{ width: '90px', height: '90px', marginTop: '-45px' }}>
            </div>
                <div className="card-body text-center pb-1">
                    <h3 className="card-title pt-1" style={{color:'#01321F'}}>Certification on every Purchase from The Diamour</h3>
                    <p className="card-text text-sm" style={{color:'#01321F'}}>Each purchase from The Diamour comes with a certification of authenticity, ensuring the highest quality and craftsmanship. Shop with confidence, knowing that your exquisite piece is genuine and crafted to perfection.
</p>
                </div>
            </a>
        </div>
        <div className=" customer-card col-lg-4 col-sm-6 mb-30 pb-5">
            <a className="card" href="#">
                <div className=" exhange box-shadow rounded-circle mx-auto " style={{width: '90px', height: '90px', marginTop: '-45px'}}></div>
                <div className="card-body text-center pb-4">
                    <h3 className="card-title pt-1 " style={{color:'#01321F'}}>100% exchange</h3>
                    <p className="card-text text-sm" style={{color:'#01321F'}}>Upgrade effortlessly with our 100% exchange offer! Trade in your old items for new ones and enjoy seamless transitions. Enhance your collection with the latest designs while benefiting from our hassle-free exchange policy.</p>
                </div>
            </a>
        </div>
        <div className=" customer-card col-lg-4 col-sm-6 mb-30 pb-5">
            <a className="card" href="#">
            <div className=" refund box-shadow rounded-circle mx-auto " style={{width: '90px', height: '90px', marginTop: '-45px'}}></div>
                <div className="card-body text-center">
                    <h3 className="card-title pt-1" style={{color:'#01321F'}}>80% Lifetime Refund</h3>
                    <p className="card-text text-sm" style={{color:'#01321F'}}>Get peace of mind with our 80% Lifetime Refund Guarantee on website development services. We're committed to your satisfaction, ensuring top-quality results and support every step of the way. Your success is our priority!</p>
                </div>
            </a>
        </div>
        <div className='col-lg-2'></div>
        <div className="customer-card col-lg-4 col-sm-6 mb-30 pb-5 mt-5">
            <a className="card" href="#">
            <div className=" payment box-shadow rounded-circle mx-auto " style={{width: '90px', height: '90px', marginTop: '-45px'}}></div>
                <div className="card-body text-center">
                    <h3 className="card-title pt-1" style={{color:'#01321F'}}>Secured Payments</h3>
                    <p className="card-text text-sm" style={{color:'#01321F'}}>Ensure peace of mind with our secured payment solutions. We provide robust, encrypted transactions to protect your sensitive information, guaranteeing a safe and seamless online shopping experience. Trust us to keep your data secure.
.</p>
                </div>
            </a>
        </div>
        <div className="customer-card col-lg-4 col-sm-6 mb-30 pb-5 mt-5">
            <a className="card" href="#">
            <div className=" dilevery box-shadow rounded-circle mx-auto " style={{width: '90px', height: '90px', marginTop: '-45px'}}></div>
                <div className="card-body text-center">
                    <h3 className="card-title pt-1" style={{color:'#01321F'}}>Delivery at your door steps</h3>
                    <p className="card-text text-sm" style={{color:'#01321F'}}>Experience seamless convenience with our exceptional delivery service. Enjoy the ease of receiving your purchases directly at your doorstep, ensuring a hassle-free and delightful shopping experience. Shop now and let us bring luxury to you.</p>
                </div>
            </a>
        </div>
       
    </div>
    </div>
</section>
   </>
  )
}

export default Page
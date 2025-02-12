// import React, { useContext } from 'react'
// import "./SignUp.css"
// import { Context } from './Context';

// const SignUp = () => {
//     const{pagesAndFooter, setpagesAndFooter}=useContext(Context);
//     setpagesAndFooter(false);
//   return (
//     <div>
//         <div className="signup">
//             <span>What's your phone number or <br /> email?</span>
//             <input type="text" placeholder='Enter phone number or email' />
//             <input type="text" placeholder='Enter your name' />
//             <input type="text" placeholder='Enter password' />
//             <button>Continue</button>
//             <div className="or">
//             {/* <hr className='hr3' /> */}
//                 <p>or</p>
//                 {/* <hr className='hr4' /> */}
//             </div>
//             <button style={{backgroundColor:"rgb(226, 226, 226)",color:"black",gap:"0.5vw"}}><img style={{width:"3vw"}} src="png-transparent-google-logo-google-search-meng-meng-company-text-logo-thumbnail-removebg-preview.png" alt="" /><p>Continue with Google</p></button>
//             <button style={{backgroundColor:"rgb(226, 226, 226)",color:"black",gap:"1vw"}}><img style={{width:"2.1vw"}}  src="pngimg.com_-_apple_logo_PNG19666__3_-removebg-preview.png" alt="" /><p>Continue with Apple</p></button>
//             <div className="or">
//                 {/* <hr className='hr1' /> */}
//                 <p>or</p>
//                 {/* <hr className='hr2' /> */}
//             </div>
//             <button style={{backgroundColor:"rgb(226, 226, 226)",color:"black",gap:"1vw"}}><img style={{width:"2.1vw"}}  src="https://images.seeklogo.com/logo-png/21/2/qr-code-logo-png_seeklogo-217342.png" alt="" /><p>Log in with QR code</p></button>
//             <div className="belowSignUp">
//             <p>By proceeding, you consent to get calls, WhatsApp or <br /> SMS/RCS messages, including by automated means,<br /> from Uber and its affiliates to the number provided.</p>
//             </div>
            
//         </div>
//     </div>
//   )
// }

// export default SignUp;




import React, { useContext, useState } from 'react';
import "./SignUp.css";
import { Context } from './Context';

const SignUp = () => {
    const { setpagesAndFooter } = useContext(Context);
    setpagesAndFooter(false);

    const [formData, setFormData] = useState({
        email: '',
        name: '',
        password: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await fetch('http://localhost:5000/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Signup failed');
            }

            setSuccess('Registration successful! Please log in.');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signup">
            <span>What's your phone number or <br /> email?</span>
            <input 
                type="text" 
                name="email" 
                placeholder="Enter phone number or email" 
                value={formData.email} 
                onChange={handleChange} 
            />
            <input 
                type="text" 
                name="name" 
                placeholder="Enter your name" 
                value={formData.name} 
                onChange={handleChange} 
            />
            <input 
                type="password" 
                name="password" 
                placeholder="Enter password" 
                value={formData.password} 
                onChange={handleChange} 
            />
            <button onClick={handleSubmit} disabled={loading}>
                {loading ? 'Signing Up...' : 'Continue'}
            </button>

            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}             <div className="or">

                 <p>or</p>
                 {/* <hr className='hr4' /> */}
             </div>
             <button style={{backgroundColor:"rgb(226, 226, 226)",color:"black",gap:"0.5vw"}}><img style={{width:"3vw"}} src="png-transparent-google-logo-google-search-meng-meng-company-text-logo-thumbnail-removebg-preview.png" alt="" /><p>Continue with Google</p></button>
             <button style={{backgroundColor:"rgb(226, 226, 226)",color:"black",gap:"1vw"}}><img style={{width:"2.1vw"}}  src="pngimg.com_-_apple_logo_PNG19666__3_-removebg-preview.png" alt="" /><p>Continue with Apple</p></button>
             <div className="or">
                 {/* <hr className='hr1' /> */}
                 <p>or</p>
                 {/* <hr className='hr2' /> */}
             </div>
             <button style={{backgroundColor:"rgb(226, 226, 226)",color:"black",gap:"1vw"}}><img style={{width:"2.1vw"}}  src="https://images.seeklogo.com/logo-png/21/2/qr-code-logo-png_seeklogo-217342.png" alt="" /><p>Log in with QR code</p></button>
             <div className="belowSignUp">
             <p>By proceeding, you consent to get calls, WhatsApp or <br /> SMS/RCS messages, including by automated means,<br /> from Uber and its affiliates to the number provided.</p>
             </div>
        </div>
    );
};

export default SignUp;

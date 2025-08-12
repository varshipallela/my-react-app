// import React from 'react';
// import { Form, Input, Button } from 'antd';
// import {
//   MailOutlined,
//   LockOutlined,
//   EyeInvisibleOutlined,
//   EyeTwoTone,
// } from '@ant-design/icons';
// import '../App.css';

// import facility from './assets/facility.png';
// import iotiq from './assets/iotiq.png';
// import logo from './assets/logo.png';
// import { Link, useNavigate } from 'react-router-dom';

// const LoginPage: React.FC = () => {
//   const [form] = Form.useForm();
//   const navigate = useNavigate();

//   const onFinish = async (values: any) => {
//     try {
//       const response = await fetch('https://bmsserviceworkflow.onrender.com/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email: values.email,
//           password: values.password,
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         console.log('✅ Login successful:', data);
//         alert('Login successful!');
//         // If token is returned, store it:
//         // localStorage.setItem('token', data.token);
//         navigate('/dashboard'); // Replace with your actual route
//       } else {
//         console.error('❌ Login failed:', data);
//         alert(data.message || 'Invalid credentials');
//       }
//     } catch (error) {
//       console.error('❌ Error during login:', error);
//       alert('Server error. Please try again later.');
//     }
//   };

//   return (
//     <div className="page-container">
//       {/* Header */}
//       <div className="top-header">
//         <div className="left-logo">
//           <img src={facility} alt="SmartEdgeFM" />
//         </div>
//         <div className="right-logo">
//           <img src={iotiq} alt="IOTIQ" />
//         </div>
//       </div>

//       {/* Centered Login */}
//       <div className="login-wrapper">
//         <div className="login-card">
//           <h2 className="login-heading">Login</h2>
//           <img src={logo} alt="Bristol Myers Squibb" className="center-logo" />

//           <Form
//             form={form}
//             onFinish={onFinish}
//             layout="vertical"
//             requiredMark={false}
//           >
//             <Form.Item
//               label="User Id"
//               name="userId"
//               rules={[
//                 {
//                   required: true,
//                   message: 'Please enter your User Id / Email',
//                 },
//               ]}
//             >
//               <Input
//                 prefix={<MailOutlined />}
//                 placeholder="Enter User Id / Email"
//               />
//             </Form.Item>

//             <Form.Item
//               label="Password"
//               name="password"
//               rules={[
//                 { required: true, message: 'Please enter your password' },
//               ]}
//             >
//               <Input.Password
//                 prefix={<LockOutlined />}
//                 placeholder="Enter Your Password"
//                 iconRender={(visible: boolean) =>
//                   visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
//                 }
//               />
//             </Form.Item>

//             <Form.Item>
//               <Button
//                 type="primary"
//                 htmlType="submit"
//                 className="submit-button"
//               >
//                 SUBMIT
//               </Button>
//             </Form.Item>
//           </Form>

//           <div className="login-footer">
//             <Link to="/forgot-password" className="forgot-link">
//               Forgot your password?
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
import React from 'react';
import { Form, Input, Button } from 'antd';
import {
  MailOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from '@ant-design/icons';
import '../App.css';
import facility from '../assets/facility.png';
import iotiq from '../assets/iotiq.png';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

type Props = {
  onLogin: () => void;
};

const LoginPage: React.FC<Props> = ({ onLogin }) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('✅ Login values:', values);
    alert('Login successful!');
    onLogin(); // Triggers navigation and layout change in App.tsx
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div className="top-header">
        <div className="left-logo">
          <img src={facility} alt="SmartEdgeFM" />
        </div>
        <div className="right-logo">
          <img src={iotiq} alt="IOTIQ" />
        </div>
      </div>

      {/* Centered Login */}
      <div className="login-wrapper">
        <div className="login-card">
          <h2 className="login-heading">Login</h2>
          <img src={logo} alt="Bristol Myers Squibb" className="center-logo" />

          <Form
            form={form}
            onFinish={onFinish}
            layout="vertical"
            requiredMark={false}
          >
            <Form.Item
              label="User Id"
              name="userId"
              
              rules={[{ required: true, message: 'Please enter your User Id / Email' }]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="Enter User Id / Email"
                
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please enter your password' }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Enter Your Password"
                iconRender={(visible: boolean) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="submit-button"
              >
                SUBMIT
              </Button>
            </Form.Item>
          </Form>

          <div className="login-footer">
            <Link to="/forgot-password" className="forgot-link">
              Forgot your password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

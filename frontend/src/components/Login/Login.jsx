import {Container, Logo, Form, Input, Button, SignUpLink, ErrorMessage} from './Login.style';
import instagram from "../../assets/images/ins.webp";
import { Link, useNavigate} from 'react-router-dom';
import {useState} from 'react';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const handleChange = (e,key) => {
        let obj = {...formData, [key]: e.target.value};
        setFormData(obj);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('formData', formData);
        const unFilledFields = Object.keys(formData).filter(key => !formData[key]);
        if(unFilledFields.length){
            setError(`${unFilledFields.join(', ')} cannot be empty`);
            return;
        }
        console.log('ready to submit');
        navigate('/home');

    }

    return (<Container>
        <Logo src={instagram} alt='Instagram' />
        <Form onSubmit={handleSubmit} >
            <Input type="text" placeholder='Username' value={formData.username} 
            onChange={(e) => handleChange(e,'username')} />
            <Input type="password" placeholder='Password' value={formData.password} 
            onChange={(e) => handleChange(e,'password')}/>
            <Button type='submit'>Sign In</Button>
        </Form>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <SignUpLink>Do not have an account? <Link to='/register'>Sign Up</Link></SignUpLink>
    </Container>);
  };
  
  export default Login;
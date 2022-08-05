import AlisonLogo from '../../assets/AlisonLogo.png';
import HeadstartLogo from '../../assets/HeadstartLogo.png';

import { useNavigate } from 'react-router-dom';


function UpdateLearnersInfo() {
    const navigate = useNavigate();

    return (
        <div>
            <div>
                <header class="image-align">
                <img src={AlisonLogo} className="Alison-logo" alt="Alison Logo" onClick={() => navigate('/')}/>
                <img src={HeadstartLogo} className="Headstart-logo" alt="Headstart Logo" onClick={() => navigate('/')}/>
                </header>
            </div>
        </div>
    )
}

export default UpdateLearnersInfo;
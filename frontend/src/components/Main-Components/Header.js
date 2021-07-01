import React from 'react';
import styles from './Header.module.css'
import { Container } from 'reactstrap';

function Header(props) {

    let style = {
        backgroundImage: `url(${props.backgroundimage})`
    }

    return (

        <Container className={styles.header} style={style} fluid={true}>  
            {(props.avatar) ? <img className={styles.avatar} src={props.avatar}></img> : null}
            <div>
                {(props.title) ? <h1 className={styles.noMarginPadding} style={{color: 'white'}}>{props.title}</h1> : <h1 className={styles.noMarginPadding} style={{color: 'white'}}>The World's Best Events</h1>}
                {(props.para) ? <p className={styles.noMarginPadding} style={{color: 'white'}}>{props.para}</p> : null}
            </div>
        </Container>

    )
}

export default Header;
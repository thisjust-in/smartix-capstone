import React from 'react';
import styles from './Header.module.css'
import { Container } from 'reactstrap';

function Header(props) {

    let style = {
        backgroundImage: `url(${props.backgroundimage})`
    }
 
    return (

        <Container className={styles.header} style={style} fluid={true}>
            {props.content}
        </Container>

    )
}

export default Header;
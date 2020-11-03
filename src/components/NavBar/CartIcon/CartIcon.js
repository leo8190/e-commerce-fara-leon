import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import styles from './CartIcon.css';
import Button from '@material-ui/core/Button'

export default function CartIcon() {      
    return (
      <div id="cart-icon">
        <Button>
          <ShoppingCartOutlinedIcon idName={styles.CartIcon}/>                  
        </Button>
      </div>
    );
  }
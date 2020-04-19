import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { handleToken } from '../actions';
import { useDispatch } from 'react-redux';
const Payments = () => {
	const dispatch = useDispatch();
	return (
		<StripeCheckout
			name='Emaily'
			description='$5 For 5 emails credit'
			amount={500}
			token={(token) => dispatch(handleToken(token))}
			stripeKey='pk_test_TRabdgVijSO058CzjAir9stS007bHyFbOZ'
		>
			<button className='btn'>Add Credit</button>
		</StripeCheckout>
	);
};

export default Payments;

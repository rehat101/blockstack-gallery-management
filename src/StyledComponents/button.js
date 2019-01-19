import styled from 'styled-components';

const transition = 'transition: all .1s ease-in;';

export const Button = styled.button`
	background-color: black;
	color: white;
	font-size: 14px;
	padding: 10px 20px;
	border-radius: 4px;
	-webkit-appearance: none;
	border: 0;
	width: ${props => props.width};
	${transition}

	&:hover {
		background-color: #BD10E0;
	}

	&:disabled {
		background-color: lightgray;
		cursor: not-allowed;
	}

`;

export const ActionButton = styled.button`
	background-color: white;
	border: 2px solid #DBDBDB;
	font-size: 12px;
	font-weight: 600;
	${transition}

	&:hover {
		background-color: black;
		border-color: black;
		color: white;
	}
`;

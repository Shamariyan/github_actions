import Button, { ButtonProps } from '@mui/material/Button';
import { grey } from '@mui/material/colors';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import { alpha, styled } from '@mui/material/styles';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { alertActionCreators } from '../store';
import { ColorButton } from '../Atoms/StyledComponents';

const ContactForm = () => {
	const initialState = {
		name: '',
		email: '',
		phoneNumber: '',
		event: '',
		note: '',
	};

	const [formData, setFormData] = useState(initialState);

	const bool =
		formData.name == '' ||
		formData.email.length < 10 ||
		formData.phoneNumber.length < 10 ||
		formData.phoneNumber.length > 13 ||
		formData.event == '' ||
		formData.note == '';

	const { name, email, phoneNumber, event, note } = formData;

	const dispatch = useDispatch();
	const { setAlert } = bindActionCreators(alertActionCreators, dispatch);

	const events = [
		{
			value: 'Birthday',
			label: 'Birthday',
		},
		{
			value: 'Anniversary',
			label: 'Anniversary',
		},
		{
			value: 'Wedding',
			label: 'Wedding',
		},
		{
			value: 'Corporate celebration',
			label: 'Corporate celebration',
		},
		{
			value: 'Others',
			label: 'Others',
		},
	];

	const onChange = (e: { target: { name: any; value: any } }) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	return (
		<Grid
			container
			rowSpacing={{ xs: 2, sm: 2, md: 3 }}
			columnSpacing={{ xs: 0, sm: 2, md: 3 }}
			justifyContent="center"
		>
			<Grid item md={2} lg={2} xl={2}></Grid>
			<Grid item xs={12} sm={12} md={4} lg={4}>
				<TextField
					fullWidth
					id="standard-search"
					label="Name"
					variant="standard"
					name="name"
					value={name}
					onChange={onChange}
				/>
			</Grid>
			<Grid item xs={12} sm={12} md={4} lg={4}>
				<TextField
					fullWidth
					id="standard-search"
					label="Email"
					variant="standard"
					name="email"
					value={email}
					onChange={onChange}
				/>
			</Grid>
			<Grid item md={2} lg={2} xl={2}></Grid>
			<Grid item md={2} lg={2} xl={2}></Grid>
			<Grid item xs={12} sm={12} md={4} lg={4}>
				<TextField
					fullWidth
					id="standard-search"
					label="Phone Number"
					variant="standard"
					name="phoneNumber"
					value={phoneNumber}
					onChange={onChange}
				/>
			</Grid>
			<Grid item xs={12} sm={12} md={4} lg={4}>
				<TextField
					fullWidth
					id="standard-select-currency"
					select
					label="Event type"
					name="event"
					value={event}
					onChange={onChange}
					variant="standard"
				>
					{events.map((option: { value: any; label: any }) => (
						<MenuItem key={option.value} value={option.value}>
							{option.label}
						</MenuItem>
					))}
				</TextField>
			</Grid>
			<Grid item md={2} lg={2} xl={2}></Grid>
			<Grid item md={2} lg={2} xl={2}></Grid>
			<Grid item xs={12} sm={12} md={8} lg={8}>
				<TextField
					fullWidth
					multiline
					id="outlined-textarea"
					label="Tell us about your event"
					name="note"
					value={note}
					onChange={onChange}
					rows={4}
				/>
			</Grid>
			<Grid item md={2} lg={2} xl={2}></Grid>
			<Grid item md={2} lg={2} xl={2}></Grid>
			<Grid item xs={12} sm={12} md={8} lg={8}>
				<ColorButton
					size="large"
					variant="outlined"
					type="submit"
					onClick={() => {
						//send a mail here
						bool
							? setAlert(
									'Kindly check if the entered details are correct',
									'error'
							  )
							: setTimeout(() => {
									setFormData(initialState);
									setAlert(
										'We received your request. We will get back to you soon',
										'success'
									);
							  }, 1500);
					}}
				>
					Submit
				</ColorButton>
			</Grid>
			<Grid item md={2} lg={2} xl={2}></Grid>
		</Grid>
	);
};

export default ContactForm;

// requires a fully lowercased word

const capitalize = ([first, ...rest]) => {
	return first.toUpperCase() + rest.join('');
};

export default capitalize;

import React from "react";
import styles from "./Field.module.scss";

const Field = ({placeholder, type = "text", value, onChange}) => {
	return (
		<input
			className={styles.input}
			type={type}
			placeholder={placeholder}
			value={value}
			onChange={onChange}
		/>
	);
};

export default Field;

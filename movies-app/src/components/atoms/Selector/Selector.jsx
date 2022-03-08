import React from 'react'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const Selector = ({ options, value, onChange, label }) => {
    return (
        <FormControl fullWidth variant="filled">
            <InputLabel id="selector">{label}</InputLabel>
            <Select
                labelId="selector"
                id="selector"
                value={value}
                label={label}
                onChange={onChange}
                InputLabelProps={{
                    shrink: true
                }}
            >
                <MenuItem key={"none"} value="">None</MenuItem>
                {
                    options.map(opt => (
                        <MenuItem key={opt.id} value={opt.id}>{opt.value}</MenuItem>
                    ))
                }
            </Select>
        </FormControl>
    )
}

export default Selector
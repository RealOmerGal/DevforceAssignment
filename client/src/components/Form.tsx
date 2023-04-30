import {
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useForm } from "../hooks/useForm";
import { CreateServerDto } from "../types/server";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getServersTypes } from "../api/get-server-types";
import { ServerType } from "../types/server-type";
import { useServerStore } from "../stores/server-store";

function Form() {
  const [serverTypes, setServerTypes] = useState<ServerType[]>([]);
  const [currentTypeIndex, setCurrentTypeIndex] = useState(0);
  const { createServer } = useServerStore();

  useEffect(() => {
    //Get all server types and set them in the state
    const fetchServerTypes = async () => {
      const types = await getServersTypes();
      setServerTypes(types);
    };
    fetchServerTypes();
  }, []);

  const handleSubmit = async () => {
    const createServerDto: CreateServerDto = {
      ...values,
      typeId: serverTypes[currentTypeIndex]?.id!,
    };
    createServer(createServerDto);
  };

  const onSelectChange = useCallback(
    (e: SelectChangeEvent<string>) => {
      //Find the new selected value in the serverTypes array and set it if found
      const selectedTypeIndex = serverTypes.findIndex(
        (type) => type.name === e.target.value
      );
      if (selectedTypeIndex !== -1) {
        setCurrentTypeIndex(selectedTypeIndex);
      }
    },
    [serverTypes]
  );

  const { onChange, onSubmit, values } = useForm<CreateServerDto>(
    handleSubmit,
    {
      ipAddress: "",
      name: "",
      typeId: "",
    }
  );

  const currentType = useMemo(
    () => serverTypes[currentTypeIndex],
    [serverTypes, currentTypeIndex]
  );

  return (
    <Grid
      container
      rowSpacing={2}
      columnSpacing={2}
      component={"form"}
      width={{ xs: "100vw", sm: "70vw", md: "20vw" }}
      sx={{ ml: { xs: 0, sm: 2, md: "10vw" } }}
      onSubmit={onSubmit}
    >
      <Grid item xs={6}>
        <InputLabel>Server name</InputLabel>
        <input
          id="serverName"
          name="name"
          required
          onChange={onChange}
          value={values.name}
        />
      </Grid>
      <Grid item xs={6}>
        <InputLabel>Server IP</InputLabel>
        <input
          id="serverIp"
          name="ipAddress"
          onChange={onChange}
          required
          value={values.ipAddress}
        />
      </Grid>
      <Grid item xs={6}>
        {currentType && (
          <Select
            size="small"
            fullWidth
            defaultValue=""
            name="type"
            value={currentType ? currentType.name : ""}
            onChange={onSelectChange}
          >
            {serverTypes?.map((type) => (
              <MenuItem key={type.id} value={type.name}>
                {type.name}
              </MenuItem>
            ))}
          </Select>
        )}
      </Grid>
      <Grid item xs={6}>
        <Button variant="contained" fullWidth type="submit">
          Add Server
        </Button>
      </Grid>
    </Grid>
  );
}

export default Form;

import { forwardRef } from "react";
import Select from "../../../../components/ui/Select/Select";
import { useUsersQuery } from "../../../users/users.queries";

type Props = {
  label?: string;
  error?: string;
};

const OwnerSelect = forwardRef<HTMLSelectElement, Props>(
  ({ label = "Owner", error, ...selectProps }, ref) => {
    const { data: users = [] } = useUsersQuery();

    const options = users.map((user) => ({
      value: user.id,
      label: user.email,
    }));

    return (
      <Select
        ref={ref}
        label={label}
        error={error}
        options={options}
        {...selectProps}
      />
    );
  },
);

export default OwnerSelect;

import { useRef, useState } from "react";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";

import Button from "@/components/shared/button/Button";
import Form from "@/components/shared/form/Form";
import SubmitButton from "@/components/shared/submitButton/SubmitButton";
import ValidateInput from "@/components/shared/validateInput/ValidateInput";
import { UnitGroupSummaries } from "@/lib/dTOs/admin/UnitGroupSummariesDTO";
import { nameof } from "@/lib/utils/nameof";
import unitGroupFormValidationSchema, {
  UnitGroupFormErrorType,
  UnitGroupFormType,
} from "@/lib/validations/schemas/admin/unitGroupFormValidationSchema";

type Props = {
  group: UnitGroupSummaries;
  onCancel: () => void;
  action: (formData: FormData) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  errors: UnitGroupFormErrorType;
  isPending?: boolean;
};

export default function EditUnitGroupModalContent({
  group,
  onCancel,
  action,
  onSubmit,
  errors,
  isPending,
}: Props) {
  const refUnitName = useRef<HTMLInputElement>(null);

  const [value, setValue] = useState(group.name);

  return (
    <Form
      action={action}
      onSubmit={onSubmit}
      className="flex flex-col gap-5"
      noValidate
    >
      <div>
        <ValidateInput
          ref={refUnitName}
          name={nameof<UnitGroupFormType>("name")}
          value={value}
          label="Název skupiny jednotek"
          className="mb-4"
          required
          errors={errors}
          autoComplete="off"
          fullWidth
          variant="faded"
          color="primary"
          validationSchema={unitGroupFormValidationSchema}
          onValueChange={setValue}
          endContent={
            <MdOutlineDriveFileRenameOutline className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
        />
      </div>
      <div className="flex py-2 px-1 justify-between">
        <Button color="danger" variant="flat" onPress={onCancel}>
          Zrušit
        </Button>
        <SubmitButton
          color="primary"
          disabled={isPending}
          isLoading={isPending}
        >
          Uložit
        </SubmitButton>
      </div>
    </Form>
  );
}

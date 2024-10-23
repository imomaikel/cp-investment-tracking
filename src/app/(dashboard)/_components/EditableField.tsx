import { EditFieldFnType, InvestmentEditableFieldType } from '@/lib/types';

type EditableFieldType = {
	activeFieldId: string | null;
	setActiveFieldId: (newId: string | null) => void;
	editField: EditFieldFnType;
	id: string;
	value: string | number;
	cellId: string;
	fieldType: keyof InvestmentEditableFieldType;
	onCancel: () => void;
	isSaving: boolean;
};
/**
 * Render the editable form field
 * @param setActiveFieldId Set the active field id
 * @param activeFieldId The active field id
 * @param editField The function to edit the selected field
 * @param id The database id of the field
 * @param value The value of the field
 * @param cellId The unique id of the cell
 * @param fieldType The type of the field
 * @param onCancel The function to cancel the edit
 * @param isSaving Is saving
 */
const EditableField = ({
	setActiveFieldId,
	activeFieldId,
	editField,
	id,
	value,
	cellId,
	fieldType,
	onCancel,
	isSaving,
}: EditableFieldType) => {
	return (
		<div
			onClick={() => {
				if (isSaving) return;
				setActiveFieldId(cellId);
			}}
		>
			{activeFieldId === cellId ? (
				<input
					disabled={isSaving}
					className='w-full ring-1 ring-border rounded-md px-2 outline-none focus:ring-primary transition-colors'
					autoFocus
					defaultValue={value}
					onBlur={onCancel}
					type={typeof value === 'number' ? 'number' : 'text'}
					onChange={(event) => {
						const newValue =
							typeof value === 'number'
								? event.target.valueAsNumber
								: event.target.value;
						if (typeof value === 'number') {
							if (typeof newValue === 'number' && isNaN(newValue)) return;
						}
						editField(id, fieldType, newValue);
					}}
				/>
			) : (
				<span>{value}</span>
			)}
		</div>
	);
};

export default EditableField;

import {
	EditingNameSurname,
	EditingEmailPassword,
	EditingID,
} from '@/components/shared'

export const SettingRouts = [
	{ path: 'name&surname', element: EditingNameSurname },
	{ path: 'email&password', element: EditingEmailPassword },
	{ path: 'ID', element: EditingID },
]

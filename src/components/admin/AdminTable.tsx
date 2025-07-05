
import {
    Box,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    IconButton,
    Typography,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

interface AdminTableProps<T> {
    title: string;
    data: T[];
    columns: {
        key: keyof T;
        header: string;
    }[];
    onEdit?: (row: T) => void;
    onDelete?: (row: T) => void;
}

function AdminTable<T>({
    title,
    data,
    columns,
    onEdit,
    onDelete,
}: AdminTableProps<T>) {
    return (
        <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
                {title}
            </Typography>

            <Paper>
                <Table>
                    <TableHead
                        sx={{
                            '& th': {
                                backgroundColor: 'secondaryHeader.main',
                                color: 'secondaryHeader.contrastText',
                            },
                        }}
                    >
                        <TableRow>
                            {columns.map((col) => (
                                <TableCell key={col.key as string}>
                                    <strong>{col.header}</strong>
                                </TableCell>
                            ))}
                            {(onEdit || onDelete) && (
                                <TableCell align="right">
                                    <strong>Actions</strong>
                                </TableCell>
                            )}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {data.map((row, index) => (
                            <TableRow
                                key={index}
                                sx={{
                                    bgcolor: 'hsla(139, 90.3%, 20.2%, 0.04)',
                                    '& .MuiTableCell-root': {
                                        color: 'secondaryHeader.main',
                                    },
                                }}
                            >
                                {columns.map((col) => (
                                    <TableCell key={col.key as string}>
                                        {String(row[col.key])}
                                    </TableCell>
                                ))}

                                {(onEdit || onDelete) && (
                                    <TableCell align="right">
                                        {onEdit && (
                                            <IconButton
                                                size="small"
                                                onClick={() => onEdit(row)}
                                                aria-label="Edit"
                                            >
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                        )}
                                        {onDelete && (
                                            <IconButton
                                                size="small"
                                                onClick={() => onDelete(row)}
                                                aria-label="Delete"
                                            >
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        )}
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                        {data.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={columns.length + 1} align="center">
                                    No data available.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Paper>
        </Box>
    );
}

export default AdminTable;

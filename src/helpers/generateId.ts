import { generate } from 'randomstring';

function generateId(length: number): string {
    return generate({ length });
}

export default generateId;
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

const SHEET_ID = process.env.SHEET_ID || '1D8-eI0nS4o4u6972pi1Ai9yApkPZeaVC86WoOgdbyLA';
const SHEET_URL = 'https://script.google.com/macros/s/AKfycbx-RDOwLjxo7z0EkY4KIRDdKIlY-17ZIun0D4zMwU0fDGYh_BZ1yznlnBQh0aZ6e-r5-w/exec';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { action = 'update', value, row } = body;
        if (!value) {
            return NextResponse.json(null, { status: 400 });
        }
        const params = new URLSearchParams({
            sheetId: SHEET_ID,
            action,
            value: JSON.stringify(value)
        });
        if (row) {
            params.append('row', row);
        }
        const response = await axios.get(`${SHEET_URL}?${params}`);
        return NextResponse.json(response.data);
    } catch {
        return NextResponse.json({ error: 'lỗi proxy' }, { status: 500 });
    }
}

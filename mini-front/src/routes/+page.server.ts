import type { PageServerLoad } from '../../.svelte-kit/types/src/routes/$types';
import { env } from '$env/dynamic/private';

export const load: PageServerLoad = async ({fetch}) => {
    const res = await fetch(env.BACK_URL);
    const data = await res.json();
    console.log(data.message);
    return;
}
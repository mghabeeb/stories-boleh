import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
    const client = await serverSupabaseClient(event);

    // Fetch the latest 100 rows
    const { data, error } = await client
        .from("analytics_events")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100);

    if (error) {
        throw createError({ statusCode: 500, statusMessage: error.message });
    }

    return data;
});

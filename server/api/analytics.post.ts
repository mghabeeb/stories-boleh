import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    console.log("Received analytics payload:", body);

    const client = await serverSupabaseClient(event);

    // Extract variables with structural fallback rules
    const { event: eventType, from, to, ...rest } = body;

    // Fallback logic: If explicitly provided use body.path,
    // if it's navigation use 'to', otherwise fallback to a default slash
    const path = body.path || to || "/";

    // Reconstruct the JSON payload to store in your 'value' database column
    const valuePayload = {
        ...rest,
        ...(from ? { from } : {}),
        ...(to ? { to } : {}),
    };

    const { error } = await client.from("analytics_events").insert({
        event_type: eventType,
        path: path, // Guaranteed non-null value string now
        value: valuePayload, // Safely holds dynamic contexts like { duration: x } or { from, to }
    });

    if (error) {
        console.error("Supabase Write Error:", error);
        throw createError({
            statusCode: 500,
            statusMessage: "Failed to log analytics",
        });
    }

    return { success: true };
});

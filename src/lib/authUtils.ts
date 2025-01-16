import { createSupabaseClient } from "@/lib/supaBaseClient";
import { User } from "@supabase/supabase-js";

export const getCurrentUser = async (): Promise<User | null> => {
  const client = createSupabaseClient();
  const {
    data: { user },
  } = await client.auth.getUser();
  return user;
};

export const signOut = async () => {
  const client = createSupabaseClient();
  await client.auth.signOut();
};

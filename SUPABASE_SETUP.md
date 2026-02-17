# Supabase Storage Setup Guide

The error **"Storage bucket 'avatars' not found"** occurs because the Supabase project does not have a storage container created to hold the profile pictures. You must create this manually in your Supabase Dashboard.

## Step 1: Create the Bucket

1.  Log in to your [Supabase Dashboard](https://supabase.com/dashboard).
2.  Select your project.
3.  Click on the **Storage** icon in the left sidebar (it looks like a box or archive).
4.  Click the **"New Bucket"** button.
5.  Enter the name: **`avatars`** (Must be exactly `avatars`, lowercase).
6.  **IMPORTANT**: Toggle the switch **"Public bucket"** to **ON**.
    *   *If this is off, your images won't load in the app.*
7.  Click **"Save"**.

## Step 2: Set Storage Policies

By default, even public buckets might restrict uploads. You need to allow logged-in users to upload files.

1.  In the Storage page, you should see your new `avatars` bucket.
2.  Click on the **"Configuration"** tab (or "Policies").
3.  Look for **"Storage Policies"** or clicking "Policies" next to the bucket name.
4.  Click **"New Policy"**.
5.  Select **"For full customization"**.
6.  **Create "Allow Uploads" Policy**:
    *   **Policy Name**: `Allow authenticated uploads`
    *   **Allowed Operation**: Check **INSERT**.
    *   **Target roles**: `authenticated`.
    *   **Click "Review"** then **"Save"**.
7.  **Create "Allow Viewing" Policy** (If not already handled by "Public" setting):
    *   *Usually, setting the bucket to "Public" handles the SELECT permissions, but if images don't load, add this:*
    *   New Policy -> Full Customization.
    *   **Operation**: **SELECT**.
    *   **Target roles**: `anon` (and `authenticated`).
    *   Review and Save.

## Step 3: Verify

1.  Go back to your app.
2.  Refresh the page.
3.  Try uploading a photo again.
4.  It should work now!

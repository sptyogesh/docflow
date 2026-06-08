> For project setup, deployment, and implementation details, see [README.md](../README.md).

For the assessment, I would use this flow:

## 1. Login

```text
Login Page
    ↓
owner@test.com
user@test.com
    ↓
Dashboard
```

---

## 2. Dashboard

Sidebar:

```text
+ New Document

My Documents

Shared With Me
```

Main Page:

```text
Document List
```

---

## 3. Create Document

```text
Click New Document
    ↓
Create Empty Document
    ↓
Title: Untitled Document
    ↓
Open Editor
```

Database:

```json
{
  "title": "Untitled Document",
  "content": "",
  "ownerId": "userId"
}
```

---

## 4. Edit Document

```text
Document Title
────────────────────

[B] [I] [U] [H1] [• List] [1. List]

Editor Area

────────────────────

Save Button
```

Features:

```text
✅ Bold
✅ Italic
✅ Underline
✅ Heading
✅ Bullet List
✅ Numbered List
```

---

## 5. Rename Document

```text
Click Title
    ↓
Edit Title
    ↓
Save
```

Example:

```text
Untitled Document
      ↓
Project Notes
```

---

## 6. Save Document

```text
User Types Content
    ↓
Click Save
    ↓
Store HTML in MongoDB
```

Example:

```html
<h1>Meeting Notes</h1>
<p>This is a test document.</p>
```

---

## 7. Reopen Document

```text
Dashboard
    ↓
My Documents
    ↓
Select Document
    ↓
Load Content
    ↓
Editor Opens
```

---

## 8. Upload File

Supported:

```text
.txt
.md
```

Flow:

```text
Upload File
    ↓
Read File Content
    ↓
Create New Document
    ↓
Insert Content
    ↓
Open Editor
```

Example:

```text
notes.txt
```

Content:

```text
Today meeting notes
```

Becomes:

```text
New Document Created
↓
Content Loaded
↓
User Can Edit
```

---

## 9. Share Document

Inside Editor:

```text
Share Button
```

Flow:

```text
Click Share
    ↓
Select User
    ↓
Grant Access
```

Example:

```text
Project Notes
    ↓
Share With
    ↓
user@test.com
```

---

## 10. Shared User View

Login:

```text
user@test.com
```

Sidebar:

```text
My Documents

Shared With Me
```

Open:

```text
Shared With Me
    ↓
Project Notes
```

Can view/edit according to your implementation.

---

## 11. MongoDB Collections

### Users

```json
{
  "_id": "",
  "email": "owner@test.com",
  "password": "hashed"
}
```

### Documents

```json
{
  "_id": "",
  "title": "Project Notes",
  "content": "<h1>Hello</h1>",
  "ownerId": ""
}
```

### Shares

```json
{
  "_id": "",
  "documentId": "",
  "sharedWithUserId": ""
}
```

---

## MVP Checklist

```text
✅ Authentication

✅ Create Document

✅ Rename Document

✅ Rich Text Editor

✅ Save Document

✅ Reopen Document

✅ Upload .txt

✅ Upload .md

✅ Share Document

✅ My Documents

✅ Shared With Me

✅ MongoDB 

✅ One Automated Test

✅ README

✅ Architecture Note

✅ AI Workflow Note

✅ Deployment

✅ Walkthrough Video
```

If you build exactly this flow in Next.js + MongoDB and deploy it on Vercel, you'll satisfy all the mandatory requirements of the assignment.


Recommended Stack
Next.js 15
TypeScript
MongoDB url (i will be later share)
Prisma ORM use
NextAuth 
TipTap Editor
Tailwind CSS

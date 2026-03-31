# Aluminium Company Web App - Implementation Guide

## 1) System Architecture

### High-level flow
- React frontend (public + admin pages) calls Spring Boot REST API via Axios.
- Spring Boot handles business logic, auth, uploads, and persistence.
- PostgreSQL on Supabase stores application data.
- Uploaded images are currently saved to local `uploads/` and can be switched to Supabase Storage.

### Suggested deployment topology
- `frontend` deployed on Vercel/Netlify.
- `backend` deployed on Render/Fly.io/AWS.
- Supabase PostgreSQL + Storage as managed backend services.

## 2) Folder Structure

```text
aluminum_company/
  backend/
    src/main/java/com/aluminium/backend/
      config/
      controller/
      dto/
      model/
      repository/
      service/
  frontend/
    src/
      api/
      components/
      pages/
```

## 3) Database Design (PostgreSQL)

### Core tables
- `project` (id, title, description, cover_image_url, created_at, updated_at)
- `project_category` (id, name, project_id FK, created_at, updated_at)
- `project_image` (id, image_url, caption, project_category_id FK, created_at, updated_at)
- `product_category` (id, name, created_at, updated_at)
- `product` (id, name, description, image_url, product_category_id FK, created_at, updated_at)

### Relationships
- One `project` -> many `project_category`
- One `project_category` -> many `project_image`
- One `product_category` -> many `product`

## 4) REST API Design

### Public endpoints
- `GET /api/public/projects`
- `GET /api/public/projects/{id}`
- `GET /api/public/products`

### Admin endpoints (Basic Auth)
- `POST /api/admin/projects`
- `PUT /api/admin/projects/{id}`
- `DELETE /api/admin/projects/{id}`
- `POST /api/admin/project-categories`
- `POST /api/admin/project-images`
- `POST /api/admin/product-categories`
- `POST /api/admin/products`
- `POST /api/admin/uploads` (multipart form-data with `file`)

### Example response
```json
{
  "id": 1,
  "title": "Tower Facade Upgrade",
  "description": "Custom facade and glazing system.",
  "coverImageUrl": "/uploads/cover.jpg",
  "categories": [
    {
      "id": 10,
      "name": "Facades",
      "images": [
        { "id": 99, "imageUrl": "/uploads/facade-1.jpg", "caption": "South elevation" }
      ]
    }
  ]
}
```

## 5) Development Plan and Milestones

1. Core backend entities/repositories/public APIs
2. Public frontend pages with filters and lightbox
3. Security and admin API
4. Admin dashboard CRUD forms
5. Replace local upload with Supabase Storage
6. Validation, tests, pagination, deployment hardening

## 6) Best Practices

- Keep DTOs separated from entities for API stability.
- Protect admin endpoints with role-based auth.
- Validate request payloads (`@Valid`) and return consistent error responses.
- Use image optimization and lazy loading on frontend.
- Add DB indexes for category and FK columns as data grows.

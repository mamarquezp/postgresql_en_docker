CREATE TYPE "public"."rol" AS ENUM('admin', 'editor', 'lector');--> statement-breakpoint
CREATE TABLE "proyectos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nombre" text NOT NULL,
	"propietario_id" uuid NOT NULL,
	"creado_en" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "usuarios" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"nombre" text NOT NULL,
	"rol" "rol" DEFAULT 'lector' NOT NULL,
	"creado_en" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "usuarios_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "proyectos" ADD CONSTRAINT "proyectos_propietario_id_usuarios_id_fk" FOREIGN KEY ("propietario_id") REFERENCES "public"."usuarios"("id") ON DELETE cascade ON UPDATE no action;
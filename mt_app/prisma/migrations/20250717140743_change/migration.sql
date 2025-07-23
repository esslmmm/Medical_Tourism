-- CreateEnum
CREATE TYPE "action_history_type_action" AS ENUM ('Add', 'Remove', 'Update');

-- CreateEnum
CREATE TYPE "languages_proficiency" AS ENUM ('Basic', 'Conversational', 'Fluent', 'Native');

-- CreateEnum
CREATE TYPE "payment_payment_status" AS ENUM ('successful', 'Failed', 'Peding', 'Refund');

-- CreateEnum
CREATE TYPE "interpreters_language" AS ENUM ('English', 'Arabic', 'Burmese');

-- CreateEnum
CREATE TYPE "patient_details_gender" AS ENUM ('Male', 'Female');

-- CreateEnum
CREATE TYPE "user_role" AS ENUM ('customer', 'staff', 'admin');

-- CreateEnum
CREATE TYPE "tourism_bookings_status" AS ENUM ('In_Progress', 'Pending', 'Approved', 'Rejected');

-- CreateEnum
CREATE TYPE "inter_bookings_status" AS ENUM ('In_Progress', 'Pending', 'Approved', 'Rejected', 'Cancelled');

-- CreateEnum
CREATE TYPE "hotel_bookings_status" AS ENUM ('In_Progress', 'Pending', 'Approved', 'Rejected', 'Cancelled');

-- CreateEnum
CREATE TYPE "package_bookings_status" AS ENUM ('In_Progress', 'Pending', 'Approved', 'Completed', 'Rejected', 'Cancelled');

-- CreateEnum
CREATE TYPE "appointments_status" AS ENUM ('In_Progress', 'Pending', 'Approved', 'Rejected', 'Completed', 'Cancelled');

-- CreateEnum
CREATE TYPE "FileCategory" AS ENUM ('CHAT_ATTACHMENT', 'MEDICAL_REPORT', 'DOCUMENT');

-- CreateEnum
CREATE TYPE "packages_package_type" AS ENUM ('Medical_Tourism', 'Medical_Service_Only');

-- CreateTable
CREATE TABLE "action_history" (
    "id" INTEGER,
    "type_action" "action_history_type_action",
    "timestamp" TIMESTAMP(0),
    "action" VARCHAR(255),
    "action_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "action_history_pkey" PRIMARY KEY ("action_id")
);

-- CreateTable
CREATE TABLE "files" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "originalName" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "cloudinaryId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "category" "FileCategory" NOT NULL,
    "description" TEXT,

    CONSTRAINT "files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "appointment_files" (
    "id" SERIAL NOT NULL,
    "appointmentId" TEXT NOT NULL,
    "fileId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "appointment_files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chat_files" (
    "id" SERIAL NOT NULL,
    "chatId" INTEGER NOT NULL,
    "fileId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "chat_files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "appointments" (
    "appointment_id" TEXT NOT NULL,
    "date" DATE,
    "timeslot" VARCHAR(255),
    "patient_id" INTEGER,
    "description" TEXT,
    "doctor_id" TEXT,
    "status" "appointments_status" NOT NULL DEFAULT 'In_Progress',

    CONSTRAINT "appointments_pkey" PRIMARY KEY ("appointment_id")
);

-- CreateTable
CREATE TABLE "description" (
    "description_id" SERIAL NOT NULL,
    "package_id" TEXT NOT NULL,
    "details" VARCHAR(255) NOT NULL,
    "title" VARCHAR(100) NOT NULL,

    CONSTRAINT "description_pkey" PRIMARY KEY ("description_id")
);

-- CreateTable
CREATE TABLE "doc_certificate" (
    "cerfiticate_id" SERIAL NOT NULL,
    "doctor_id" TEXT,
    "field_of_study" VARCHAR(255),
    "institution" VARCHAR(255),
    "year" INTEGER,

    CONSTRAINT "doc_certificate_pkey" PRIMARY KEY ("cerfiticate_id")
);

-- CreateTable
CREATE TABLE "doc_education" (
    "education_id" SERIAL NOT NULL,
    "doctor_id" TEXT,
    "field_of_study" VARCHAR(255),
    "institution" VARCHAR(255),
    "year" INTEGER,

    CONSTRAINT "doc_education_pkey" PRIMARY KEY ("education_id")
);

-- CreateTable
CREATE TABLE "doc_language" (
    "language_id" SERIAL NOT NULL,
    "doctor_id" TEXT,
    "languages" VARCHAR(255),

    CONSTRAINT "doc_language_pkey" PRIMARY KEY ("language_id")
);

-- CreateTable
CREATE TABLE "doctors" (
    "doctor_id" TEXT NOT NULL,
    "name" VARCHAR(255),
    "specialization" VARCHAR(255),
    "hospital_id" TEXT,
    "experience" INTEGER,
    "description" VARCHAR(200),
    "image" VARCHAR(255),
    "create_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "doctors_pkey" PRIMARY KEY ("doctor_id")
);

-- CreateTable
CREATE TABLE "hospitals" (
    "hospital_id" TEXT NOT NULL,
    "name" VARCHAR(100),
    "hospital_code" VARCHAR(20),
    "location" VARCHAR(255),
    "city" VARCHAR(50),
    "description" TEXT,
    "contact_info" VARCHAR(255),
    "rating" DOUBLE PRECISION,
    "image" VARCHAR(255),
    "logo" VARCHAR(255) NOT NULL,
    "create_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "hospitals_pkey" PRIMARY KEY ("hospital_id")
);

-- CreateTable
CREATE TABLE "hotel_bookings" (
    "booking_id" SERIAL NOT NULL,
    "hotel_id" INTEGER,
    "check_in_date" DATE,
    "check_out_date" DATE,
    "guest_children" INTEGER,
    "guest_adult" INTEGER,
    "total_price" DOUBLE PRECISION,
    "status" "hotel_bookings_status" DEFAULT 'In_Progress',
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "hotel_bookings_pkey" PRIMARY KEY ("booking_id")
);

-- CreateTable
CREATE TABLE "hotel_facilities" (
    "facility_id" SERIAL NOT NULL,
    "hotel_id" INTEGER,
    "facility_name" VARCHAR(100),
    "description" TEXT,

    CONSTRAINT "hotel_facilities_pkey" PRIMARY KEY ("facility_id")
);

-- CreateTable
CREATE TABLE "hotel_images" (
    "image_id" SERIAL NOT NULL,
    "hotel_id" INTEGER,
    "image" VARCHAR(255),

    CONSTRAINT "hotel_images_pkey" PRIMARY KEY ("image_id")
);

-- CreateTable
CREATE TABLE "hotel_room_facilities" (
    "room_facilitiy_id" SERIAL NOT NULL,
    "room_id" INTEGER,
    "facility_name" VARCHAR(100),
    "description" TEXT,

    CONSTRAINT "hotel_room_facilities_pkey" PRIMARY KEY ("room_facilitiy_id")
);

-- CreateTable
CREATE TABLE "hotel_rooms" (
    "room_id" SERIAL NOT NULL,
    "hotel_id" INTEGER,
    "room_type" VARCHAR(100),
    "price_per_night" DOUBLE PRECISION,
    "capacity" VARCHAR(200),
    "description" TEXT,
    "image" VARCHAR(255),

    CONSTRAINT "hotel_rooms_pkey" PRIMARY KEY ("room_id")
);

-- CreateTable
CREATE TABLE "hotels" (
    "hotel_id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "hotel_code" VARCHAR(20),
    "location" VARCHAR(255),
    "city" VARCHAR(100),
    "rating" DOUBLE PRECISION,
    "email" VARCHAR(50),
    "description" TEXT,
    "image" VARCHAR(255),
    "check_in_time" VARCHAR(10) NOT NULL DEFAULT '1 PM',
    "contact_info" VARCHAR(255),
    "create_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "hotels_pkey" PRIMARY KEY ("hotel_id")
);

-- CreateTable
CREATE TABLE "inter_bookings" (
    "booking_id" SERIAL NOT NULL,
    "interpreter_id" INTEGER,
    "start" DATE,
    "end" DATE,
    "status" "inter_bookings_status" DEFAULT 'In_Progress',
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "inter_bookings_pkey" PRIMARY KEY ("booking_id")
);

-- CreateTable
CREATE TABLE "inter_education" (
    "education_id" SERIAL NOT NULL,
    "interpreter_id" INTEGER,
    "degree" VARCHAR(50),
    "field_of_study" VARCHAR(255),
    "institution" VARCHAR(100),

    CONSTRAINT "inter_education_pkey" PRIMARY KEY ("education_id")
);

-- CreateTable
CREATE TABLE "interpreters" (
    "interpreter_id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(50) NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "nationality" VARCHAR(100) NOT NULL,
    "image" VARCHAR(255) NOT NULL,
    "birthofday" DATE NOT NULL,
    "experience" DATE NOT NULL DEFAULT ('2025-02-02'),
    "address" TEXT NOT NULL,
    "profile_summary" TEXT NOT NULL,
    "language" "interpreters_language" NOT NULL,
    "create_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "interpreters_pkey" PRIMARY KEY ("interpreter_id")
);

-- CreateTable
CREATE TABLE "languages" (
    "lang_id" SERIAL NOT NULL,
    "interpreter_id" INTEGER,
    "language_name" VARCHAR(100),
    "proficiency" "languages_proficiency",

    CONSTRAINT "languages_pkey" PRIMARY KEY ("lang_id")
);

-- CreateTable
CREATE TABLE "medical_services" (
    "service_id" SERIAL NOT NULL,
    "hospital_id" TEXT,
    "service_name" VARCHAR(255),
    "description" VARCHAR(255),

    CONSTRAINT "medical_services_pkey" PRIMARY KEY ("service_id")
);

-- CreateTable
CREATE TABLE "messages" (
    "message_id" SERIAL NOT NULL,
    "message" TEXT,
    "timestamp" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
    "chat_id" INTEGER NOT NULL,
    "receiver_id" INTEGER,
    "sender_id" INTEGER,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("message_id")
);

-- CreateTable
CREATE TABLE "package_bookings" (
    "booking_id" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "package_id" TEXT NOT NULL,
    "tourism_booking_id" TEXT,
    "appointment_id" TEXT,
    "hotel_booking_id" INTEGER,
    "contact_id" TEXT,
    "inter_booking_id" INTEGER,
    "create_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "package_bookings_status" NOT NULL DEFAULT 'In_Progress',

    CONSTRAINT "package_bookings_pkey" PRIMARY KEY ("booking_id")
);

-- CreateTable
CREATE TABLE "package_doc" (
    "doc_id" SERIAL NOT NULL,
    "package_id" TEXT,
    "doctor_id" TEXT,

    CONSTRAINT "package_doc_pkey" PRIMARY KEY ("doc_id")
);

-- CreateTable
CREATE TABLE "package_hotels" (
    "packhotel_id" SERIAL NOT NULL,
    "package_id" TEXT,
    "hotel_id" INTEGER,

    CONSTRAINT "package_hotels_pkey" PRIMARY KEY ("packhotel_id")
);

-- CreateTable
CREATE TABLE "package_image" (
    "images" VARCHAR(255),
    "image_id" SERIAL NOT NULL,
    "package_id" TEXT,
    "detail" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "package_image_pkey" PRIMARY KEY ("image_id")
);

-- CreateTable
CREATE TABLE "package_interpreters" (
    "inter_id" SERIAL NOT NULL,
    "package_id" TEXT,
    "interpreter_id" INTEGER,

    CONSTRAINT "package_interpreters_pkey" PRIMARY KEY ("inter_id")
);

-- CreateTable
CREATE TABLE "package_places" (
    "packplace_id" SERIAL NOT NULL,
    "tour_id" INTEGER,
    "place_id" TEXT,
    "date" INTEGER NOT NULL,
    "start" VARCHAR(10) NOT NULL,
    "end" VARCHAR(10) NOT NULL,

    CONSTRAINT "package_places_pkey" PRIMARY KEY ("packplace_id")
);

-- CreateTable
CREATE TABLE "packages" (
    "package_id" TEXT NOT NULL,
    "package_name" VARCHAR(255) NOT NULL,
    "package_type" "packages_package_type" NOT NULL,
    "hospital_id" TEXT NOT NULL,
    "image" VARCHAR(255) NOT NULL,
    "detail" VARCHAR(100) NOT NULL,
    "duration" INTEGER NOT NULL,
    "expired_date" DATE NOT NULL,
    "create_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "packages_pkey" PRIMARY KEY ("package_id")
);

-- CreateTable
CREATE TABLE "payment" (
    "payment_date" TIMESTAMP(3) NOT NULL,
    "payment_method" VARCHAR(255) NOT NULL,
    "amount" DECIMAL(10,0) NOT NULL,
    "payment_status" "payment_payment_status" NOT NULL,
    "transaction_id" VARCHAR(50) NOT NULL,
    "booking_id" TEXT NOT NULL,
    "payment_id" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "payment_pkey" PRIMARY KEY ("payment_id")
);

-- CreateTable
CREATE TABLE "place_image" (
    "image" VARCHAR(255),
    "image_id" SERIAL NOT NULL,
    "place_id" TEXT,

    CONSTRAINT "place_image_pkey" PRIMARY KEY ("image_id")
);

-- CreateTable
CREATE TABLE "places" (
    "place_id" TEXT NOT NULL,
    "place_name" VARCHAR(100),
    "contact_info" VARCHAR(255),
    "location" VARCHAR(255),
    "city" VARCHAR(255),
    "image" VARCHAR(255),
    "description" TEXT,
    "fee" DOUBLE PRECISION,

    CONSTRAINT "places_pkey" PRIMARY KEY ("place_id")
);

-- CreateTable
CREATE TABLE "review_hospital" (
    "review_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "hospital_id" TEXT NOT NULL,
    "rating" DOUBLE PRECISION,
    "title_review" TEXT,
    "comment" TEXT,
    "created_at" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "review_hospital_pkey" PRIMARY KEY ("review_id")
);

-- CreateTable
CREATE TABLE "review_hotel" (
    "review_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "hotel_id" INTEGER NOT NULL,
    "rating" DOUBLE PRECISION,
    "title_review" TEXT,
    "comment" TEXT,
    "created_at" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "review_hotel_pkey" PRIMARY KEY ("review_id")
);

-- CreateTable
CREATE TABLE "review_inter" (
    "review_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "interpreter_id" INTEGER NOT NULL,
    "rating" DOUBLE PRECISION,
    "title_review" TEXT,
    "comment" TEXT,
    "created_at" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "review_inter_pkey" PRIMARY KEY ("review_id")
);

-- CreateTable
CREATE TABLE "room_aggregate" (
    "amount" INTEGER NOT NULL,
    "aggregate_id" SERIAL NOT NULL,
    "booking_id" INTEGER,
    "room_id" INTEGER,

    CONSTRAINT "room_aggregate_pkey" PRIMARY KEY ("aggregate_id")
);

-- CreateTable
CREATE TABLE "room_image" (
    "image_id" SERIAL NOT NULL,
    "image" VARCHAR(255),
    "room_id" INTEGER,

    CONSTRAINT "room_image_pkey" PRIMARY KEY ("image_id")
);

-- CreateTable
CREATE TABLE "tourism_bookings" (
    "tourism_id" TEXT NOT NULL,
    "tour_id" INTEGER,
    "status" "tourism_bookings_status" DEFAULT 'In_Progress',
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tourism_bookings_pkey" PRIMARY KEY ("tourism_id")
);

-- CreateTable
CREATE TABLE "hospital_images" (
    "image_id" SERIAL NOT NULL,
    "hospital_id" TEXT,
    "image" VARCHAR(255),

    CONSTRAINT "hospital_images_pkey" PRIMARY KEY ("image_id")
);

-- CreateTable
CREATE TABLE "chat" (
    "timestamp" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "chat_id" SERIAL NOT NULL,
    "user1_id" INTEGER NOT NULL,
    "user2_id" INTEGER,

    CONSTRAINT "chat_pkey" PRIMARY KEY ("chat_id")
);

-- CreateTable
CREATE TABLE "patient_details" (
    "patient_id" SERIAL NOT NULL,
    "firstname" VARCHAR(255),
    "lastname" VARCHAR(255),
    "gender" "patient_details_gender",
    "dateofbirth" DATE,
    "nationality" VARCHAR(255),
    "passport_number" VARCHAR(255),

    CONSTRAINT "patient_details_pkey" PRIMARY KEY ("patient_id")
);

-- CreateTable
CREATE TABLE "trips" (
    "tour_id" SERIAL NOT NULL,
    "package_id" TEXT NOT NULL,
    "description" TEXT,
    "total_price" DOUBLE PRECISION,

    CONSTRAINT "trips_pkey" PRIMARY KEY ("tour_id")
);

-- CreateTable
CREATE TABLE "contact_us" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contact_us_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "email" VARCHAR(255) NOT NULL,
    "nationality" VARCHAR(255),
    "password" TEXT,
    "image" VARCHAR(2048),
    "role" "user_role" NOT NULL DEFAULT 'customer',
    "otp" VARCHAR(10),
    "otp_expiry" TIMESTAMP(3),
    "is_email_verified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_contact_detail" (
    "id" TEXT NOT NULL,
    "firstname" VARCHAR(255),
    "lastname" VARCHAR(255),
    "email" VARCHAR(255),
    "country" VARCHAR(255),
    "phone" INTEGER,

    CONSTRAINT "user_contact_detail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "action_history_user_id_idx" ON "action_history"("user_id");

-- CreateIndex
CREATE INDEX "files_userId_idx" ON "files"("userId");

-- CreateIndex
CREATE INDEX "appointment_files_appointmentId_idx" ON "appointment_files"("appointmentId");

-- CreateIndex
CREATE INDEX "appointment_files_fileId_idx" ON "appointment_files"("fileId");

-- CreateIndex
CREATE INDEX "chat_files_chatId_idx" ON "chat_files"("chatId");

-- CreateIndex
CREATE INDEX "chat_files_fileId_idx" ON "chat_files"("fileId");

-- CreateIndex
CREATE INDEX "appointments_patient_id_idx" ON "appointments"("patient_id");

-- CreateIndex
CREATE INDEX "appointments_doctor_id_idx" ON "appointments"("doctor_id");

-- CreateIndex
CREATE INDEX "package_id" ON "description"("package_id");

-- CreateIndex
CREATE INDEX "doc_certificate_doctor_id_idx" ON "doc_certificate"("doctor_id");

-- CreateIndex
CREATE INDEX "doc_education_doctor_id_idx" ON "doc_education"("doctor_id");

-- CreateIndex
CREATE INDEX "doctor_id" ON "doc_language"("doctor_id");

-- CreateIndex
CREATE INDEX "hospital_id" ON "doctors"("hospital_id");

-- CreateIndex
CREATE INDEX "hotel_bookings_hotel_id_idx" ON "hotel_bookings"("hotel_id");

-- CreateIndex
CREATE INDEX "hotel_facilities_hotel_id_idx" ON "hotel_facilities"("hotel_id");

-- CreateIndex
CREATE INDEX "hotel_images_hotel_id_idx" ON "hotel_images"("hotel_id");

-- CreateIndex
CREATE INDEX "hotel_room_facilities_room_id_idx" ON "hotel_room_facilities"("room_id");

-- CreateIndex
CREATE INDEX "hotel_rooms_hotel_id_idx" ON "hotel_rooms"("hotel_id");

-- CreateIndex
CREATE INDEX "inter_bookings_interpreter_id_idx" ON "inter_bookings"("interpreter_id");

-- CreateIndex
CREATE INDEX "inter_education_interpreter_id_idx" ON "inter_education"("interpreter_id");

-- CreateIndex
CREATE INDEX "languages_interpreter_id_idx" ON "languages"("interpreter_id");

-- CreateIndex
CREATE INDEX "medical_services_hospital_id_idx" ON "medical_services"("hospital_id");

-- CreateIndex
CREATE INDEX "messages_sender_id_idx" ON "messages"("sender_id");

-- CreateIndex
CREATE INDEX "messages_receiver_id_idx" ON "messages"("receiver_id");

-- CreateIndex
CREATE INDEX "messages_chat_id_idx" ON "messages"("chat_id");

-- CreateIndex
CREATE INDEX "package_bookings_user_id_idx" ON "package_bookings"("user_id");

-- CreateIndex
CREATE INDEX "package_bookings_package_id_idx" ON "package_bookings"("package_id");

-- CreateIndex
CREATE INDEX "package_bookings_tourism_booking_id_idx" ON "package_bookings"("tourism_booking_id");

-- CreateIndex
CREATE INDEX "package_bookings_appointment_id_idx" ON "package_bookings"("appointment_id");

-- CreateIndex
CREATE INDEX "package_bookings_hotel_booking_id_idx" ON "package_bookings"("hotel_booking_id");

-- CreateIndex
CREATE INDEX "package_bookings_contact_id_idx" ON "package_bookings"("contact_id");

-- CreateIndex
CREATE INDEX "package_bookings_inter_booking_id_idx" ON "package_bookings"("inter_booking_id");

-- CreateIndex
CREATE INDEX "package_doc_package_id_idx" ON "package_doc"("package_id");

-- CreateIndex
CREATE INDEX "package_doc_doctor_id_idx" ON "package_doc"("doctor_id");

-- CreateIndex
CREATE INDEX "package_hotels_package_id_idx" ON "package_hotels"("package_id");

-- CreateIndex
CREATE INDEX "package_hotels_hotel_id_idx" ON "package_hotels"("hotel_id");

-- CreateIndex
CREATE INDEX "package_image_package_id_idx" ON "package_image"("package_id");

-- CreateIndex
CREATE INDEX "package_interpreters_package_id_idx" ON "package_interpreters"("package_id");

-- CreateIndex
CREATE INDEX "package_interpreters_interpreter_id_idx" ON "package_interpreters"("interpreter_id");

-- CreateIndex
CREATE INDEX "package_places_tour_id_idx" ON "package_places"("tour_id");

-- CreateIndex
CREATE INDEX "package_places_place_id_idx" ON "package_places"("place_id");

-- CreateIndex
CREATE INDEX "packages_hospital_id_idx" ON "packages"("hospital_id");

-- CreateIndex
CREATE INDEX "payment_user_id_idx" ON "payment"("user_id");

-- CreateIndex
CREATE INDEX "payment_booking_id_idx" ON "payment"("booking_id");

-- CreateIndex
CREATE INDEX "place_image_place_id_idx" ON "place_image"("place_id");

-- CreateIndex
CREATE INDEX "review_hospital_user_id_idx" ON "review_hospital"("user_id");

-- CreateIndex
CREATE INDEX "review_hospital_hospital_id_idx" ON "review_hospital"("hospital_id");

-- CreateIndex
CREATE INDEX "review_hotel_user_id_idx" ON "review_hotel"("user_id");

-- CreateIndex
CREATE INDEX "review_hotel_hotel_id_idx" ON "review_hotel"("hotel_id");

-- CreateIndex
CREATE INDEX "review_inter_user_id_idx" ON "review_inter"("user_id");

-- CreateIndex
CREATE INDEX "review_inter_interpreter_id_idx" ON "review_inter"("interpreter_id");

-- CreateIndex
CREATE INDEX "room_aggregate_room_id_idx" ON "room_aggregate"("room_id");

-- CreateIndex
CREATE INDEX "room_aggregate_booking_id_idx" ON "room_aggregate"("booking_id");

-- CreateIndex
CREATE INDEX "room_image_room_id_idx" ON "room_image"("room_id");

-- CreateIndex
CREATE INDEX "tourism_bookings_tour_id_idx" ON "tourism_bookings"("tour_id");

-- CreateIndex
CREATE INDEX "hospital_images_hospital_id_idx" ON "hospital_images"("hospital_id");

-- CreateIndex
CREATE INDEX "chat_user2_id_idx" ON "chat"("user2_id");

-- CreateIndex
CREATE INDEX "chat_user1_id_idx" ON "chat"("user1_id");

-- CreateIndex
CREATE INDEX "trips_package_id_idx" ON "trips"("package_id");

-- CreateIndex
CREATE UNIQUE INDEX "Contact_Us_email_key" ON "contact_us"("email");

-- CreateIndex
CREATE INDEX "Account_userId_fkey" ON "account"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "account_provider_providerAccountId_key" ON "account"("provider", "providerAccountId");

-- AddForeignKey
ALTER TABLE "action_history" ADD CONSTRAINT "action_history_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "files" ADD CONSTRAINT "files_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointment_files" ADD CONSTRAINT "appointment_files_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "appointments"("appointment_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointment_files" ADD CONSTRAINT "appointment_files_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "files"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_files" ADD CONSTRAINT "chat_files_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "chat"("chat_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_files" ADD CONSTRAINT "chat_files_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "files"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_ibfk_1" FOREIGN KEY ("patient_id") REFERENCES "patient_details"("patient_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_ibfk_2" FOREIGN KEY ("doctor_id") REFERENCES "doctors"("doctor_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "description" ADD CONSTRAINT "description_ibfk_1" FOREIGN KEY ("package_id") REFERENCES "packages"("package_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "doc_certificate" ADD CONSTRAINT "doc_certificate_ibfk_1" FOREIGN KEY ("doctor_id") REFERENCES "doctors"("doctor_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "doc_education" ADD CONSTRAINT "doc_education_ibfk_1" FOREIGN KEY ("doctor_id") REFERENCES "doctors"("doctor_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "doc_language" ADD CONSTRAINT "doc_language_ibfk_1" FOREIGN KEY ("doctor_id") REFERENCES "doctors"("doctor_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "doctors" ADD CONSTRAINT "doctors_ibfk_1" FOREIGN KEY ("hospital_id") REFERENCES "hospitals"("hospital_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "hotel_bookings" ADD CONSTRAINT "hotel_bookings_hotel_id_fkey" FOREIGN KEY ("hotel_id") REFERENCES "hotels"("hotel_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "hotel_facilities" ADD CONSTRAINT "hotel_facilities_hotel_id_fkey" FOREIGN KEY ("hotel_id") REFERENCES "hotels"("hotel_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "hotel_images" ADD CONSTRAINT "hotel_images_hotel_id_fkey" FOREIGN KEY ("hotel_id") REFERENCES "hotels"("hotel_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "hotel_room_facilities" ADD CONSTRAINT "hotel_room_facilities_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "hotel_rooms"("room_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "hotel_rooms" ADD CONSTRAINT "hotel_rooms_hotel_id_fkey" FOREIGN KEY ("hotel_id") REFERENCES "hotels"("hotel_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inter_bookings" ADD CONSTRAINT "inter_bookings_interpreter_id_fkey" FOREIGN KEY ("interpreter_id") REFERENCES "interpreters"("interpreter_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inter_education" ADD CONSTRAINT "inter_education_interpreter_id_fkey" FOREIGN KEY ("interpreter_id") REFERENCES "interpreters"("interpreter_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "languages" ADD CONSTRAINT "languages_interpreter_id_fkey" FOREIGN KEY ("interpreter_id") REFERENCES "interpreters"("interpreter_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "medical_services" ADD CONSTRAINT "medical_services_hospital_id_fkey" FOREIGN KEY ("hospital_id") REFERENCES "hospitals"("hospital_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_receiver_id_fkey" FOREIGN KEY ("receiver_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "chat"("chat_id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "package_bookings" ADD CONSTRAINT "package_bookings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "package_bookings" ADD CONSTRAINT "package_bookings_package_id_fkey" FOREIGN KEY ("package_id") REFERENCES "packages"("package_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "package_bookings" ADD CONSTRAINT "package_bookings_tourism_booking_id_fkey" FOREIGN KEY ("tourism_booking_id") REFERENCES "tourism_bookings"("tourism_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "package_bookings" ADD CONSTRAINT "package_bookings_appointment_id_fkey" FOREIGN KEY ("appointment_id") REFERENCES "appointments"("appointment_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "package_bookings" ADD CONSTRAINT "package_bookings_hotel_booking_id_fkey" FOREIGN KEY ("hotel_booking_id") REFERENCES "hotel_bookings"("booking_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "package_bookings" ADD CONSTRAINT "package_bookings_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "user_contact_detail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "package_bookings" ADD CONSTRAINT "package_bookings_inter_booking_id_fkey" FOREIGN KEY ("inter_booking_id") REFERENCES "inter_bookings"("booking_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "package_doc" ADD CONSTRAINT "package_doc_package_id_fkey" FOREIGN KEY ("package_id") REFERENCES "packages"("package_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "package_doc" ADD CONSTRAINT "package_doc_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "doctors"("doctor_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "package_hotels" ADD CONSTRAINT "package_hotels_package_id_fkey" FOREIGN KEY ("package_id") REFERENCES "packages"("package_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "package_hotels" ADD CONSTRAINT "package_hotels_hotel_id_fkey" FOREIGN KEY ("hotel_id") REFERENCES "hotels"("hotel_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "package_image" ADD CONSTRAINT "package_image_package_id_fkey" FOREIGN KEY ("package_id") REFERENCES "packages"("package_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "package_interpreters" ADD CONSTRAINT "package_interpreters_package_id_fkey" FOREIGN KEY ("package_id") REFERENCES "packages"("package_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "package_interpreters" ADD CONSTRAINT "package_interpreters_interpreter_id_fkey" FOREIGN KEY ("interpreter_id") REFERENCES "interpreters"("interpreter_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "package_places" ADD CONSTRAINT "package_places_tour_id_fkey" FOREIGN KEY ("tour_id") REFERENCES "trips"("tour_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "package_places" ADD CONSTRAINT "package_places_place_id_fkey" FOREIGN KEY ("place_id") REFERENCES "places"("place_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "packages" ADD CONSTRAINT "packages_hospital_id_fkey" FOREIGN KEY ("hospital_id") REFERENCES "hospitals"("hospital_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "package_bookings"("booking_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "place_image" ADD CONSTRAINT "place_image_place_id_fkey" FOREIGN KEY ("place_id") REFERENCES "places"("place_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "review_hospital" ADD CONSTRAINT "review_hospital_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "review_hospital" ADD CONSTRAINT "review_hospital_hospital_id_fkey" FOREIGN KEY ("hospital_id") REFERENCES "hospitals"("hospital_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "review_hotel" ADD CONSTRAINT "review_hotel_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "review_hotel" ADD CONSTRAINT "review_hotel_hotel_id_fkey" FOREIGN KEY ("hotel_id") REFERENCES "hotels"("hotel_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "review_inter" ADD CONSTRAINT "review_inter_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "review_inter" ADD CONSTRAINT "review_inter_interpreter_id_fkey" FOREIGN KEY ("interpreter_id") REFERENCES "interpreters"("interpreter_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room_aggregate" ADD CONSTRAINT "room_aggregate_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "hotel_rooms"("room_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "room_aggregate" ADD CONSTRAINT "room_aggregate_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "hotel_bookings"("booking_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "room_image" ADD CONSTRAINT "room_image_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "hotel_rooms"("room_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tourism_bookings" ADD CONSTRAINT "tourism_bookings_tour_id_fkey" FOREIGN KEY ("tour_id") REFERENCES "trips"("tour_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "hospital_images" ADD CONSTRAINT "hospital_images_hospital_id_fkey" FOREIGN KEY ("hospital_id") REFERENCES "hospitals"("hospital_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "chat" ADD CONSTRAINT "chat_user1_id_fkey" FOREIGN KEY ("user1_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "chat" ADD CONSTRAINT "chat_user2_id_fkey" FOREIGN KEY ("user2_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "trips" ADD CONSTRAINT "trips_package_id_fkey" FOREIGN KEY ("package_id") REFERENCES "packages"("package_id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

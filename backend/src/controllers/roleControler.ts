import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Role from "../models/Role";
import User from "../models/User";
import { crypt } from "../config/crypto-js";

//@desc create a role
//@route POST /api/admin/roles
//@access public
const createRole = asyncHandler(async (req: Request, res: Response) => {
  const { name } = req.body;
  const role = await Role.create({ name });
  res.status(201).json({ reps: crypt.encode(role), done: true });
});

//@desc read all roles
//@route GET /api/roles
//@access public
//<<<<<<< HEAD
const allRoles = asyncHandler(async (req: Request, res: any) => {
  try{
  const roles = await Role.findAll({
    attributes:['idRole','name','createdAt']
  });
  if(roles[0]!= null){
   return res.status(200).json({ reps:roles, done: true });
  }
  return res.status(404).json({message:'aucun role trouve'})
 
}catch(error){console.log(error);return res.status(500).json({message:'erreur de serveur'})};
})
/*
const allRoles = asyncHandler(async (req: Request, res: Response) => {
  const roles = await Role.findAll();
  res.status(200).json({
    // reps: crypt.encode(roles),
    reps: roles,
    done: true,
  });
>>>>>>> vf1/vf1
});
*/
//@desc update a role
//@route PATCH /api/admin/roles/"id"
//@access public
const updateRole = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  const { name } = req.body;
  const role = await Role.findByPk(id);
  if (!role) {
    res.status(400);
    throw new Error("Aucun role trouve");
  }
  role.name = name || role.name;
  await role.save();
  res.status(200).json({ reps: role, done: true });
});

//@desc delete a role
//@route DEL /api/admin/roles/:id
//@access private
const deleteRole = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const role = await Role.findByPk(id);
  if (!role) {
    res.status(400);
    throw new Error("aucun role trouve");
  }
  await role.destroy();
  res.status(204).json({ actionDone: true });
});

//@desc read a role with all users
//@route GET /apiadmin/roleUsers/:id
//@access public
const roleUsers = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  const roleUsers = await Role.findByPk(id, {
    include: [{ model: User, through: { attributes: [] } }],
  });
  res.status(200).json({ reps: roleUsers, done: true });
});

export { createRole, allRoles,  updateRole, deleteRole, roleUsers };
